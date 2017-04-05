const schemas = [{
    schema: require('./document-draft-01'),
    version: "01"
  }, {
    schema: require('./document-draft-02'),
    version: "02"
  }
];

schemas.byVersion = (v) => {
  schemas.forEach(item => {
    if(item.version === v) {
      return item.schema;
    }
  });

  return null;
}

module.exports = schemas;