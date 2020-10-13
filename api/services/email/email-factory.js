class EmailFactory {
  getService() {
    let service = null;

    if (__app.config.mail.sendgrid) {
      service = require("./sendgrid-service");
    } else if (__app.config.mail.gmail) {
      service = require("./gmail-service");
    } else if (__app.config.mail.smtp) {
      service = require("./smtp-service");
    } else {
      throw new Error(
        "Neither of these is configured [SendGrid, GMAIL, SMTP] in the emailSettting"
      );
    }
    return service;
  }
}

module.exports = new EmailFactory();
