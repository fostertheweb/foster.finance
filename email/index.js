const crypto = require("crypto");

function handler(event, _context, callback) {
  const code = event.request.codeParameter;
  const email = event.request.usernameParameter;
  const hash = crypto.createHash("sha256");

  hash.update(`${email}+${code}`);

  const domain = "https://foster.finance";
  const link = `<a href="${domain}/signup/verify?token=${hash.digest("hex")}">
    Verify Email
  </a>`;
  const message = `Hello, click this link ${link}`;

  switch (event.triggerSource) {
    case "CustomMessage_SignUp":
      event.response.smsMessage = message;
      event.response.emailMessage = message;
      event.response.emailSubject = "is it you?";
      break;
    default:
      event.response.smsMessage = "pog";
      event.response.emailMessage = "pog";
      event.response.emailSubject = "poggers";
      break;
  }

  callback(null, event);
}

module.exports = { handler };
