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
    project = "foster-finance"
  }
}

# Cognito
resource "aws_cognito_user_pool" "pool" {
  name                     = "foster-finance"
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
    email_sending_account = "COGNITO_DEFAULT"
  }

  tags = local.common_tags
}

resource "aws_cognito_user_pool_client" "client" {
  name         = " foster-finance-client"
  user_pool_id = aws_cognito_user_pool.pool.id
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
resource "aws_iam_role" "iam_for_lambda" {
  name = "foster-finance-lambda-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "api" {
  filename         = "./server/lambda.zip"
  function_name    = "foster-finance-api"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "exports.handler"
  source_code_hash = filebase64sha256("./server/lambda.zip")
  runtime          = "nodejs12.x"

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
resource "aws_s3_bucket" "client" {
  bucket = "foster.finance"
  acl    = "public-read"

  policy = <<EOF
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::foster.finance/*"]
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = local.common_tags
}

resource "aws_s3_bucket_object" "client" {
  for_each = fileset("./web/build", "**")

  bucket       = aws_s3_bucket.client.id
  key          = each.value
  source       = "./web/build/${each.value}"
  etag         = filemd5("./web/build/${each.value}")
  content_type = lookup(var.client_mime_types, split(".", each.value)[length(split(".", each.value)) - 1])

  depends_on = [aws_s3_bucket.client]
}

#Cloudfront
resource "aws_cloudfront_distribution" "cdn" {
  enabled = true
  bucket  = "foster.finance"

  depends_on = [aws_s3_bucket.client]
}

resource "aws_cloudfront_origin_access_identity" "access_identity" {

}

# Route53
data "aws_route53_zone" "selected" {
  name = "foster.finance."
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
  domain_name       = "foster.finance"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.common_tags
}

resource "aws_route53_record" "cert_validation" {
  name    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  zone_id = "${data.aws_route53_zone.selected.id}"
  records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = "${aws_acm_certificate.cert.arn}"
  validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}"]
}
