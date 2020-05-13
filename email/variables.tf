variable "application" {
  default = "foster-finance"
  type    = string
}

variable "domain_name" {
  default = "foster.finance"
  type    = string
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