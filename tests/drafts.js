const Document = require('../core').Document;
const mocks = [
  require('./mocks/simple-document'),
  require('./mocks/alternative-version')
];

module.exports = new Promise((resolve, reject) => {
  mocks.forEach(mock => {
    try {
      let doc = Document.parse(mock);
    } catch (e) {
      return reject(e);
    }

    return resolve();
  });
});
