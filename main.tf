terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "fostertheweb"

    workspaces {
      name = "foster-finance"
    }
  }
}

provider "aws" {
  version = "~> 2.0"
  region  = "us-east-1"
}

module "web" {
  source = "./web"

  application = var.application
  domain_name = var.domain_name
}

module "server" {
  source = "./server"

  application      = var.application
  plaid_client_id  = var.plaid_client_id
  plaid_secret     = var.plaid_secret
  plaid_public_key = var.plaid_public_key
  plaid_env        = var.plaid_env
}
