const crypto = require("crypto");

function handler(event, _context, callback) {
  const code = event.request.codeParameter;
  const email = event.request.usernameParameter;
  const hash = crypto.createHash("sha256");

  hash.update(`${email}+${code}`);

  const link =
    "<a href='https://foster.finance/signup/verify?token=" +
    hash.digest("hex") +
    "'>confirm email</a>";
  const message =
    "welcome to foster finance, let's confirm your email and go back to finish your profile." +
    "<br />" +
    link +
    "<em style='display:none'>" +
    event.request.codeParameter +
    "</em>";

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
