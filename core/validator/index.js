const Ajv = require('ajv');
const DEFAULT_DRAFT_VERSION = '02';

class JDONValidator {

  set version(v) {
    this._version = v ? v : DEFAULT_DRAFT_VERSION;
  }
  get version() { return this._version; }

  constructor(version) {
    this.version = version;
  }

  static validate(string) {
    let ajv = new Ajv();
    let validator = ajv.compile(require(`./schemas/document-draft-${this.version}.json`));
    return validator(string);
  }
}

module.exports = JDONValidator;
