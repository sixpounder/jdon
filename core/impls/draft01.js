const Document = require('../jdon-document');

/**
 * Represents a JSON draft 01 document
 */
class DocumentDraft01 extends Document {
  static parse(string) {
    let obj;
    if(this.validate(string))
    // For each locale
    Object.keys(obj.locales).forEach((lCode) => {
      let newLocale = this.locales.push(new DocumentLocaleDraft01(lCode));
      let l = obj.locales[lCode];
      newLocale.title = l.title;

      // For each fragment in this locale
      l.fragments.forEach(frag => {
        let f = (new DocumentFragmentDraft01(frag));
        newLocale.addFragment(f);

      });
    });
    return this; // Chainable
  }
}

class DocumentLocaleDraft01 {
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

class DocumentFragmentDraft01 {
  constructor(data) {
    this.topology = data.topology;
    this.content  = data.content;
    this.mimetype = data.mimetype;
  }
}

module.exports = DocumentDraft01;