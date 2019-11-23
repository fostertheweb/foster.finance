variable "application" {
  default = "foster-finance"
  type    = "string"
}

variable "db_name" {
  type = "string"
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
    woff  = "font/woff"
    woff2 = "font/woff2"
  }
}
