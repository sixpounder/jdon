const chalk = require('chalk');
const tests = [
  require('./lint'),
  require('./drafts')
];

Promise.all(tests).then(() => {
  console.log(chalk.green("Completed with no errors"));
}, err => {
  console.log(err);
  console.log(chalk.red("Completed with errors"));
});
