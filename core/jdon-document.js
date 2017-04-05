const JDONValidator = require('./validator');

/**
 * Converts a jdon string to a {Document}
 * @param {string} jsonAsString JDON string
 */
const converter = function JSONConverter(jsonAsString) {
  let valid = JDONValidator.validate(jsonAsString);
  if(valid) {
    let obj = JSON.parse(jsonAsString);
    let doc = new Document();
    // doc._original = {};
    // Object.assign(doc._original, obj);

    // For each locale
    Object.keys(obj.locales).each((lCode) => {
      let newLocale = doc.locales.push(new DocumentLocale(lCode));
      let l = obj.locales[lCode];
      newLocale.title = l.title;

      // For each fragment in this locale
      l.fragments.each(frag => {
        let f = (new DocumentFragment(frag));
        newLocale.addFragment(f);

      });
    });
    return doc;
  } else {
    throw new Error(valid.errors);
  }

};

/**
 * JDON Document class
 * @type {Document}
 */
class Document {

  constructor() {

  }

  /**
   * Returns a new {Document} from a jdon string
   * @param  {string} jsonAsString JDON document string
   * @return {Document}            The parsed Document
   * @throws {Error}               Thrown if json schema validation fails
   */
  static fromJSON(jsonAsString) {
    return converter(jsonAsString);
  }

}

class DocumentLocale {
  constructor(code) {
    this.code = code;
    this.title = null;
    this.fragments = [];
  }

  set title(title) { this.title = title; }

  addFragment(f) {
    this.fragments.push(f);
    return f;
  }

  get fragments() {
    return this.fragments;
  }
}

class DocumentFragment {
  constructor(data) {
    this.topology = data.topology;
    this.content  = data.content;
    this.mimetype = data.mimetype;
  }
}

module.exports = Document;
