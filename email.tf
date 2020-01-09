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
  domain = aws_ses_domain_identity.root.id

  depends_on = [aws_route53_record.ses_verification]
}

resource "aws_ses_domain_dkim" "root" {
  domain = aws_ses_domain_identity.root.domain
}

resource "aws_route53_record" "ses_dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.selected.zone_id
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

data "aws_iam_policy_document" "ses" {
  statement {
    sid       = "AllowUserPoolSendEmail"
    effect    = "Allow"
    actions   = ["ses:SendEmail", "ses:SendRawEmail"]
    resources = [aws_ses_domain_identity.root.arn]

    principals {
      type        = "Service"
      identifiers = ["cognito-idp.amazonaws.com"]
    }
  }
}

resource "aws_ses_identity_policy" "send_email" {
  identity = aws_ses_domain_identity.root.arn
  name     = "${var.application}-ses-send-email"
  policy   = data.aws_iam_policy_document.ses.json
}

resource "aws_route53_record" "zoho" {
  zone_id = data.aws_route53_zone.selected.id
  name    = var.zoho_record_name
  type    = "CNAME"
  records = [var.zoho_record_value]
  ttl     = 300
}

resource "aws_route53_record" "zoho_mx" {
  zone_id = data.aws_route53_zone.selected.id
  name    = "@"
  type    = "MX"
  records = ["10 mx.zoho.com", "20 mx2.zoho.com", "50 mx3.zoho.com"]
  ttl     = 3600
}

resource "aws_route53_record" "zoho_spf" {
  zone_id = data.aws_route53_zone.selected.id
  name    = ""
  type    = "TXT"
  records = ["v=spf1 include:zoho.com ~all"]
  ttl     = 600
}

resource "aws_route53_record" "zoho_dkim" {
  zone_id = data.aws_route53_zone.selected.id
  name    = "zoho._domainkey.${var.domain_name}"
  type    = "TXT"
  records = ["${var.zoho_dkim_1}\"\"${var.zoho_dkim_2}"]
  ttl     = 600
}
