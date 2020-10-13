const nodemailer = require('nodemailer')
const templateService = require('./template-service')

class GmailService {
  constructor () {
    if (!__app.config.mail.gmail) {
      throw new Error('Missing GMAIL configuration')
    }
   const settings = __app.config.mail.gmail;
    this.transporter = nodemailer.createTransport(settings)
  }
  async send (params={template:"user-activation.hbs"}) {
    const html = params.body || templateService.render(params.template, params.model||{})
    const message = {
      from: "ghadad@gmail.com" ||params.from || __app.config.mail.fromEmail,
      to: "ghadad@gmail.com" || params.to ,
      subject: "subject" || params.subject,
      html,
    //  attachments: params.attachments
    }
    await this.transporter.sendMail(message)
    message.type = 'gmail'
    message.body = message.html
    return message
  }
}

module.exports = new GmailService()
