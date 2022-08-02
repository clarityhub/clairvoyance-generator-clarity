const chalk = require('chalk');
const Generator = require('yeoman-generator');


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  warn() {
    this.log(
`
Please run a specific generator.

${chalk.bold.blue('Subgenerators')}:
\t${chalk.gray('yo clarity:service')}
\t${chalk.gray('yo clarity:migration')}
\t${chalk.gray('yo clarity:integration')}
\t${chalk.gray('yo clarity:atom')}
`
    );
  }
};
