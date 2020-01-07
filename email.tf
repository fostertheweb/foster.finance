resource "aws_ses_domain_identity" "root" {
  domain = var.domain_name
}

resource "aws_route53_record" "ses_verification" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "_amazonses.${aws_ses_domain_identity.root.id}"
  type    = "TXT"
  ttl     = "600"
  records = [aws_ses_domain_identity.root.verification_token]
}

resource "aws_ses_domain_identity_verification" "root" {
  domain = "${aws_ses_domain_identity.root.id}"

  depends_on = ["aws_route53_record.ses_verification"]
}

resource "aws_ses_domain_dkim" "root" {
  domain = aws_ses_domain_identity.root.domain
}

resource "aws_route53_record" "ses_dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.selected.zoned_id
  name    = "${element(aws_ses_domain_dkim.root.dkim_tokens, count.index)}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = "600"
  records = ["${element(aws_ses_domain_dkim.root.dkim_tokens, count.index)}.dkim.amazonses.com"]
}

resource "aws_ses_email_identity" "reply_to" {
  email = "hello@${var.domain_name}"
}

resource "aws_ses_email_identity" "from" {
  email = "no-reply@${var.domain_name}"
}
