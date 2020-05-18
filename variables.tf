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

variable "zoho_record_name" {
  type = string
}

variable "zoho_record_value" {
  type = string
}

variable "zoho_dkim_1" {
  type = string
}

variable "zoho_dkim_2" {
  type = string
}

variable "atlas_org_id" {
  type = string
}
