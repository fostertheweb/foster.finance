locals {
  common_tags = {
    project = var.application
  }
}

data "aws_secretsmanager_secret" "config" {
  name = "${var.application}-config"
}

data "aws_secretsmanager_secret_version" "config" {
  secret_id = data.aws_secretsmanager_secret.config.id
}

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

data "aws_iam_policy_document" "ec2" {
  statement {
    sid = "1"
    actions = [
      "ec2:CreateNetworkInterface",
      "ec2:DescribeNetworkInterfaces",
      "ec2:DeleteNetworkInterface"
    ]
    resources = [
      "*"
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
data "archive_file" "server" {
  type        = "zip"
  source_dir  = "./server/dist"
  output_path = "./server/lambda.zip"
}

resource "aws_lambda_function" "server" {
  filename         = "./server/lambda.zip"
  function_name    = "${var.application}-server"
  role             = aws_iam_role.lambda.arn
  handler          = "handler.handler"
  source_code_hash = data.archive_file.server.output_base64sha256
  runtime          = "nodejs12.x"

  environment {
    variables = {
      PLAID_CLIENT_ID  = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)["PLAID_CLIENT_ID"]
      PLAID_SECRET     = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)["PLAID_SECRET"]
      PLAID_PUBLIC_KEY = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)["PLAID_PUBLIC_KEY"]
      PLAID_ENV        = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)["PLAID_ENV"]
    }
  }

  tags = local.common_tags
}

resource "aws_api_gateway_rest_api" "server" {
  name = "ff-api"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.server.id
  parent_id   = aws_api_gateway_rest_api.server.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "any" {
  rest_api_id   = aws_api_gateway_rest_api.server.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id             = aws_api_gateway_rest_api.server.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.any.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.server.invoke_arn
}

resource "aws_api_gateway_deployment" "server" {
  rest_api_id = aws_api_gateway_rest_api.server.id

  triggers = {
    redeployment = sha1(join(",", list(
      jsonencode(aws_api_gateway_integration.lambda),
    )))
  }
}

resource "aws_api_gateway_stage" "prod" {
  rest_api_id   = aws_api_gateway_rest_api.server.id
  stage_name    = "prod"
  deployment_id = aws_api_gateway_deployment.server.id
}

data "aws_route53_zone" "selected" {
  name = "${var.domain_name}."
}

resource "aws_route53_record" "api" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "api.${var.domain_name}"
  type    = "A"
  records = [aws_api_gateway_deployment.server.invoke_url]

  depends_on = [aws_api_gateway_deployment.server]
}
