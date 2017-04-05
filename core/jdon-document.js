const JDONValidator = require('./validator');

/**
 * JDON Document generic class. This class defines only common API methods. For implementations, see the impls folder
 * @type {Document}
 */
class Document {

  /**
   * Validates the JDON serialization against available schemas
   * @param {string} string A JDON string
   * @returns {object} True if valid, false otherwise
   */
  static validate(string) {
    return new JDONValidator().validate(string);
  }

  constructor() {
    this._impls = [
      require('./impls/draft01'), require('./impls/draft02')
    ];
  }


  /**
   * Fetch an implementation class from the available set.
   * @param {string} version The version for which the implementation is needed
   * @returns {Document} the {Document} subclass for the required implementation if found, {null} otherwise
   */
  getImplementationForDraft(version) {
    this._impls.forEach(impl => {
      if(impl.supportedVersions.contains(version)) {
        return impl;
      }
    });
    return null;
  }

  /**
   * Adds an implementation to the available ones. Last implentation added takes precedence
   * in case of same draft version matching
   * @param {any} impl A subclass of {Document} or an object implementing the core methods.
   */
  requireImpl(impl) {
    if(impl === null) {
      console.warn("Null implementation provided. No implementation was loaded.");
      return;
    }

    this._impls.unshift(impl);
  }

  /**
   * Fill this instance with data from a JDON document. This implementation is a NOOP, specific implementations
   * depending on draft version can be found in impls directory
   * @param {object} obj The input object parsed from a jdon document
   */
  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  fillWith(obj) {
    return new Error("Not implemented");
  }

  // INTERFACE
  // These methods are expected to be implemented/overrided in specific draft implementations

  /**
   * @return {array} An array of strings (or a single string) representing the draft versions supported by this implementation
   */
  get supportedVersions() { return null; }

  /**
   * Returns a new {Document} from a jdon string
   * @param  {string} jsonAsString JDON document string
   * @return {Document}            The parsed Document
   * @throws {Error}               Thrown if json schema validation fails
   */
  static parse(jdon) {
    let jsonAsString = jdon;
    if(typeof jsonAsString === 'string') {
      jsonAsString = JSON.parse(jsonAsString);
    }
    let valid = new JDONValidator().validate(jsonAsString);
    if(valid) {
      let obj;
      if(typeof jsonAsString === "string") {
        obj = JSON.parse(jsonAsString);
      } else {
        obj = jsonAsString;
      }

      let draftVersion = obj.version || "02";
      
      let clsImpl = this.getImplementationForDraft(draftVersion);
      if(!clsImpl) { throw new Error("Implementation for draft " + draftVersion + " could not be found"); }

      let doc = new clsImpl();
      doc.draftVersion = draftVersion;

      return doc.parse(obj);      
    } else {
      throw new Error(valid.errors);
    }
  }

  /**
   * Serializes this document to a JDON string.
   * @return {string} The json serialization of this object, compliant with the JDON schema
   */
  serialize() {
    throw new Error("Not implemented");
  }

}

module.exports = Document;
