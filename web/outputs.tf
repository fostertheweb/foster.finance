output "web_build_files" {
  value = fileset("./web/build", "**")
}

output "user_pool_id" {
  value = aws_cognito_user_pool.users.id
}

output "client_id" {
  value = aws_cognito_user_pool_client.web.id
}
