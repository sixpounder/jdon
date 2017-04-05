const CLIEngine  = require('eslint').CLIEngine;
const path       = require('path');

module.exports = new Promise((resolve, reject) => {

  try {
    var cli = new CLIEngine(require(path.resolve(process.cwd(), '.eslintrc.json')));

    // lint myfile.js and all files in lib/
    let report = cli.executeOnFiles([path.resolve(process.cwd(), 'core')]);
    
    return resolve(report);
  } catch(e) {
    return reject(e);
  }

});
