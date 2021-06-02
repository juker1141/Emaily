const keys = require("../config/keys");

const domain = keys.mailGunDomain;
const mailgun = require("mailgun-js")({
  apiKey: keys.mailGunKey,
  domain
});

class MailgunMailer {
  constructor(subject, recipient, content) {
    this.data = {
      from: "no-reply@emaily.com",
      to: recipient,
      subject: subject,
      html: content
    };
  };

  async send() {
    const response = await mailgun.messages().send(this.data);
    return response;
  };
};

module.exports = MailgunMailer;