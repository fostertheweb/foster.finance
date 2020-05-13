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

module "web" {
  source = "./web"
}

module "server" {
  source = "./server"
}

module "email" {
  source = "./email"
}
