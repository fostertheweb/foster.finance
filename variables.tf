variable "application" {
  default = "foster-finance"
  type    = string
}

variable "domain_name" {
  default = "foster.finance"
  type    = string
}

variable "plaid_client_id" {
  type = string
}

variable "plaid_public_key" {
  type = string
}

variable "plaid_secret" {
  type = string
}

variable "plaid_env" {
  type = string
}
