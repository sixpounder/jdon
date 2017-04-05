const Ajv = require('ajv');
const schemas = require('./schemas');

const DEFAULT_DRAFT_VERSION = '02';

class JDONValidator {

  static forVersion(version) {
    let v = new JDONValidator();
    v.version = version;

    return v;
  }

  set version(v) {
    this._version = v ? v : DEFAULT_DRAFT_VERSION;
  }
  get version() { return this._version; }

  constructor(version = DEFAULT_DRAFT_VERSION) {
    this.version = version;
  }

  validate(string) {
    let ajv = new Ajv();
    let validator = ajv.compile(schemas.byVersion(this._version));
    return validator(string);
  }
}

module.exports = JDONValidator;
