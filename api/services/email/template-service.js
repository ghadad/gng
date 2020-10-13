const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')

class TemplateService {
  render (template, model) {
    // add global model properties
    model.platform = __app.config.app.name;
    model.email = __app.config.mail.supportEmail;
    model.codeValidityInMinutes = __app.config.auth.codeValidityInMinutes

    // render
    const html = handlebars.compile(
      fs.readFileSync(path.join(__dirname, '..', '..', '..', 'resources', 'email', template))
        .toString('utf-8')
    )(model)
    return html
  }
}

module.exports = new TemplateService()
