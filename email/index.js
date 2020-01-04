function handler(event, _context, callback) {
  const code = event.request.codeParameter;
  const email = event.request.usernameParameter;

  switch (event.triggerSource) {
    case "CustomMessage_SignUp":
      event.response.emailSubject = "is it you?";
      event.response.emailMessage = `
      Hello, click this link <a href="https://foster.finance/signup/verify?code=${code}&email=${email}">Verify Email</a>
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
