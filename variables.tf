variable "application" {
  default = "foster-finance"
  type    = string
}

variable "domain_name" {
  default = "foster.finance"
  type    = string
}

variable "db_name" {
  type = string
}

variable "db_user" {
  type = string
}

variable "db_pass" {
  type = string
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

variable "subnets" {
  type = list(string)
}

variable "security_groups" {
  type = list(string)
}

variable "client_mime_types" {
  default = {
    html  = "text/html"
    css   = "text/css"
    js    = "application/javascript"
    map   = "application/javascript"
    json  = "application/json"
    txt   = "text/plain"
    ico   = "image/x-icon"
    ttf   = "font/ttf"
    otf   = "font/otf"
    eot   = "font/eot"
    svg   = "image/svg+xml"
    woff  = "font/woff"
    woff2 = "font/woff2"
  }
}
