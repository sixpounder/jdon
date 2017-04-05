const Ajv    = require('ajv');

class JDONValidator {
  static validate(string) {
    let ajv = new Ajv();
    let validator = ajv.compile(require('./schemas/document.json'));
    return validator(string);
  }
}

module.exports = JDONValidator;
