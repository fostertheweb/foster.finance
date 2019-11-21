variable "application" {
  default = "foster-finance"
  type    = "string"
}

variable "db_user" {
  type = "string"
}

variable "db_pass" {
  type = "string"
}

variable "plaid_client_id" {
  type = "string"
}

variable "plaid_public_key" {
  type = "string"
}

variable "plaid_secret" {
  type = "string"
}

variable "plaid_env" {
  type = "string"
}
