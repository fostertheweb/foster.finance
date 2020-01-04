const crypto = require("crypto");
const message = `Hello, click this link <a href="https://foster.finance/signup/verify?token=${hash.digest(
  "hex",
)}">Verify Email</a>`;

function handler(event, _context, callback) {
  const code = event.request.codeParameter;
  const email = event.request.usernameParameter;
  const hash = crypto.createHash("sha256");

  hash.update(`${email}+${code}`);

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
