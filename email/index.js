function handler(event, _context, callback) {
  const { codeParameter } = event.request;
  const { email } = event.request.userAttributes;
  const buffer = Buffer.from(`${email}:${codeParameter}`);
  const hash = buffer.toString("base64");
  const url = "https://foster.finance/signup/verify";
  const link = `<a href="${url}?id=${hash}">confirm email</a>`;
  const message =
    "welcome to foster finance, let's confirm your email and go back to finish your profile." +
    "<br />" +
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
