# Setup
provider "aws" {
  version = "~> 2.0"  
  region  = "us-east-1"
}

# Cognito
resource "aws_cognito_user_pool" "pool" {
  name = "foster-finance"
}

resource "aws_cognito_user_pool_client" "client" {
  name = " foster-finance-client"

  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}

# Database
resource "aws_db_instance" "user_database" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "11.5"
  instance_class       = "db.t2.micro"
  name                 = "fosterfinance"
  username             = "ffadmin"
  password             = "snoozer"
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

resource "aws_lambda_function" "application" {
  filename      = "lambda.zip"
  function_name = "foster-finance-application"
  role          = "${aws_iam_role.iam_for_lambda.arn}"
  handler       = "exports.handler"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = "${filebase64sha256("lambda.zip")}"

  runtime = "nodejs10.x"

  environment {
    variables = {
      foo = "bar"
    }
  }
}
