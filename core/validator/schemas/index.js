const schemas = [{
    schema: require('./document-draft-01'),
    version: "01"
  }, {
    schema: require('./document-draft-02'),
    version: "02"
  }
];

schemas.byVersion = (v) => {
  let found = null;
  schemas.forEach(item => {
    if(item.version === v) {
      found = item.schema;
    }
  });

  return found;  
}

module.exports = schemas;