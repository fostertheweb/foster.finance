output "client_files" {
  value = fileset("./web/build", "**")
}
