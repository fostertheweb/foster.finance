locals {
  common_tags = {
    project = var.application
  }
}

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

resource "mongodbatlas_project" "app" {
    name = var.application
    org_id = var.atlas_org_id
}

resource "mongodbatlas_cluster" "users" {

}