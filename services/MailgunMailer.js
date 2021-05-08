const keys = require("../config/keys");

const domain = keys.mailGunDomain;
const mailgun = require("mailgun-js")({
  apiKey: keys.mailGunKey,
  domain
});

class MailgunMailer {
  constructor({ subject, recipients }, content) {
    this.data = {
      from: "no-reply@emaily.com",
      to: this.formatAddresses(recipients),
      subject: subject,
      html: content
    };
  };

  formatAddresses(recipients) {
    return recipients.map(({ email }) => email).join(",");
  };

  async send() {
    const response = await mailgun.messages().send(this.data);
    return response;
  };
};

module.exports = MailgunMailer;