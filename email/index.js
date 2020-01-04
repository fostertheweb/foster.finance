const crypto = require("crypto");

function handler(event, _context, callback) {
  const code = event.request.codeParameter;
  const email = event.request.usernameParameter;
  const hash = crypto.createHash("sha256");

  hash.update(`${email}+${code}`);

  switch (event.triggerSource) {
    case "CustomMessage_SignUp":
      event.response.emailSubject = "is it you?";
      event.response.emailMessage = `
Hello, click this link <a href="https://foster.finance/signup/verify?token=${hash.digest(
        "hex",
      )}">Verify Email</a>
      `;
      break;
    default:
      event.response.emailSubject = "poggers";
      event.response.emailMessage = "pog";
      break;
  }

  callback(null, event);
}

module.exports = { handler };
