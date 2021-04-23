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
  region = "us-east-1"
}

module "web" {
  source = "./web"

  application = var.application
  domain_name = var.domain_name
}

module "server" {
  source = "./server"

  application = var.application
  domain_name = var.domain_name
}
