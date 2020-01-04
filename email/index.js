const crypto = require("crypto");

function handler(event, _context, callback) {
  const code = event.request.codeParameter;
  const email = event.request.usernameParameter;
  const hash = crypto.createHash("sha256");

  hash.update(`${email}+${code}`);

  const link =
    "<a href='https://foster.finance/signup/verify?token=" +
    hash.digest("hex") +
    "'>Verify Email</a>";
  const message = "Hello, click this link " + link + " please haha " + event.request.codeParameter;

  switch (event.triggerSource) {
    case "CustomMessage_SignUp":
    case "CustomMessage_ResendCode":
      event.response.smsMessage = message;
      event.response.emailMessage = message;
      event.response.emailSubject = "foster finance sign up";
      break;
    case "CustomMessage_VerifyUserAttribute":
      event.response.smsMessage = message;
      event.response.emailMessage = message;
      event.response.emailSubject = "foster finance verify email";
    default:
      event.response.smsMessage = "pog";
      event.response.emailMessage = "pog";
      event.response.emailSubject = "poggers";
      break;
  }

  callback(null, event);
}

module.exports = { handler };
