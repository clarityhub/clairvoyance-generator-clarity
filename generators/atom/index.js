const chalk = require('chalk');
const glob = require('glob');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('atomName', {
      type: String,
      // Not required because we will prompt for it
      required: false,
    });
  }

  prompting() {
    const done = this.async();

    this.log(
      `${chalk.bold.underline('Creating a new atom')}…`
    );

    if (this.options.atomName) {
      this.atomName = this.options.atomName;
      done();
      return;
    }

    const prompts = [{
      type: 'input',
      name: 'atomName',
      message:
        `What is the name of your atom?

Typically an atom name is one word, but if you require a multi-word
atom name, don't use spaces.

Example: ${chalk.bold.underline('MessageBlock')}
`,
      default: 'Example',
    }];

    this.prompt(prompts).then((props) => {
      Object.keys(props).forEach((key) => {
        this[key] = props[key];
      });

      done();
    });
  }

  writing() {
    const atomName = this.atomName;
    const atomNameLower = atomName.charAt(0).toLowerCase() + atomName.slice(1);
    const options = {
      atomName,
      atomNameLower,
    };

    this.fs.copyTpl(
      `${this.templatePath()}/index.js`,
      this.destinationPath(`./${atomName}/index.js`),
      options
    );

    this.fs.copyTpl(
      `${this.templatePath()}/atomName.scss`,
      this.destinationPath(`./${atomName}/${atomName}.scss`),
      options
    );
  }

  end() {
    this.log(
     `${chalk.green('Done!')}`
    );
  }
}
