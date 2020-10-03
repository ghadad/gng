const Ajv = require("flajv");
const ajv = new Ajv({ allErrors: true });

class Validator {
  constructor(fluentSchema) {
    const ajv = new Ajv({ allErrors: true });
    this.validate = ajv.compile(fluentSchema.valueOf());
    return validate;
  }
}
