output "user_pool_id" {
  value = aws_cognito_user_pool.users.id
}

output "client_id" {
  value = aws_cognito_user_pool_client.web.id
}

output "db_connection" {
  value = mongodbatlas_cluster.users.connection_strings.standard_srv
}
