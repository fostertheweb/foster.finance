# Setup
terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "Family"

    workspaces {
      name = "foster-finance"
    }
  }
}

provider "aws" {
  version = "~> 2.0"
  region  = "us-east-1"
}

locals {
  common_tags = {
    project = var.application
  }
}

# Cognito
resource "aws_cognito_user_pool" "users" {
  name                     = var.application
  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = false
    unused_account_validity_days = 0
  }

  device_configuration {
    challenge_required_on_new_device      = false
    device_only_remembered_on_user_prompt = true
  }

  email_configuration {
    reply_to_email_address = "hello@${var.domain_name}"
    source_arn             = aws_ses_email_identity.from.arn
    email_sending_account  = "DEVELOPER"
  }

  lambda_config {
    custom_message = aws_lambda_function.email.arn
  }

  tags = local.common_tags
}

resource "aws_cognito_user_pool_client" "web" {
  name                = "${var.application}-web"
  user_pool_id        = aws_cognito_user_pool.users.id
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
}

# Database
resource "aws_db_instance" "users_db" {
  allocated_storage = 20
  storage_type      = "gp2"
  engine            = "postgres"
  engine_version    = "11.5"
  instance_class    = "db.t2.micro"
  name              = var.db_name
  username          = var.db_user
  password          = var.db_pass
}

# Lambda
data "aws_iam_policy_document" "lambda" {
  statement {
    sid = "1"
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }

}

data "aws_iam_policy_document" "cloudwatch" {
  statement {
    sid = "1"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "arn:aws:logs:*:*:*"
    ]
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${var.application}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda.json
}

resource "aws_iam_role_policy" "cloudwatch_lambda" {
  name   = "${var.application}-cloudwatch-lambda"
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.cloudwatch.json
}

# zip the api directory for lambda
data "archive_file" "email" {
  type        = "zip"
  source_file = "./email/index.js"
  output_path = "./email/lambda.zip"
}

resource "aws_lambda_function" "email" {
  filename         = "./email/lambda.zip"
  function_name    = "${var.application}-email"
  role             = aws_iam_role.lambda.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.email.output_base64sha256
  runtime          = "nodejs10.x"

  tags = local.common_tags
}

resource "aws_lambda_permission" "email" {
  statement_id  = "AllowExecutionFromCognitoUserPool"
  action        = "lambda:InvokeFunction"
  function_name = "${var.application}-email"
  principal     = "cognito-idp.amazonaws.com"
}

# zip the api directory for lambda
data "archive_file" "server" {
  type        = "zip"
  source_dir  = "./server/dist"
  output_path = "./server/lambda.zip"
}

resource "aws_lambda_function" "server" {
  filename         = "./server/lambda.zip"
  function_name    = "${var.application}-server"
  role             = aws_iam_role.lambda.arn
  handler          = "handler.graphql"
  source_code_hash = data.archive_file.server.output_base64sha256
  runtime          = "nodejs10.x"

  environment {
    variables = {
      PLAID_CLIENT_ID  = var.plaid_client_id
      PLAID_SECRET     = var.plaid_secret
      PLAID_PUBLIC_KEY = var.plaid_public_key
      PLAID_ENV        = var.plaid_env
      DB_HOST          = aws_db_instance.users_db.address
      DB_PORT          = aws_db_instance.users_db.port
      DB_NAME          = aws_db_instance.users_db.name
      DB_USER          = var.db_user
      DB_PASS          = var.db_pass
    }
  }

  depends_on = [aws_db_instance.users_db]

  tags = local.common_tags
}

# Client
resource "aws_s3_bucket" "web" {
  bucket = var.domain_name

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = local.common_tags
}

resource "aws_s3_bucket_object" "web_build" {
  for_each = fileset("./web/build", "**")

  bucket       = aws_s3_bucket.web.id
  key          = each.value
  source       = "./web/build/${each.value}"
  etag         = filemd5("./web/build/${each.value}")
  content_type = lookup(var.client_mime_types, split(".", each.value)[length(split(".", each.value)) - 1])

  depends_on = [aws_s3_bucket.web]
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid       = "1"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.web.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.access_identity.iam_arn]
    }
  }

  statement {
    sid       = "2"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.web.arn}/*"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.web.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

#Cloudfront
resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.application}-cdn"
  default_root_object = "index.html"

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  origin {
    origin_id   = "${var.domain_name}-bucket"
    domain_name = aws_s3_bucket.web.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.access_identity.cloudfront_access_identity_path
    }
  }

  aliases = [var.domain_name, "www.${var.domain_name}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.domain_name}-bucket"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }

  tags = local.common_tags

  depends_on = [aws_s3_bucket.web]
}

resource "aws_cloudfront_origin_access_identity" "access_identity" {
  comment = "${var.application}-access-identity"
}

# Route53
data "aws_route53_zone" "selected" {
  name = "${var.domain_name}."
}

resource "aws_route53_record" "alias" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = data.aws_route53_zone.selected.name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [aws_cloudfront_distribution.cdn]
}

#ACM
resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.common_tags
}

resource "aws_route53_record" "cert_validation" {
  name    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
  zone_id = data.aws_route53_zone.selected.id
  records = [aws_acm_certificate.cert.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}
