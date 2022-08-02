const chalk = require('chalk');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('migrationName', {
      type: String,
      // Not required because we will prompt for it
      required: false,
    });


    this.argument('tableName', {
      type: String,
      // Not required because we will prompt for it
      required: false,
    })
  }

  prompting() {
    const done = this.async();

    this.log(
      `${chalk.bold.underline('Creating a new migration')}…`
    );

    if (this.options.migrationName) {
      this.migrationName = this.options.migrationName;
    }

    if (this.options.tableName) {
      this.tableName = this.options.tableName;
    }

    if (this.options.migrationName && this.options.tableName) {
      done();
      return;
    }

    const prompts = [];

    if (! this.options.migrationName) {
      prompts.push({
        type: 'input',
        name: 'migrationName',
        message:
`What is the name of your migration?

Feel free to use spaces, we will convert it for you

Example: ${chalk.bold.underline('My Cool Migration')}
`,
        default: 'example',
      });
    }

    if (! this.options.tableName) {
      prompts.push({
        type: 'input',
        name: 'tableName',
        message:
        `What is the name of the table you are creating?
Feel free to use spaces.

This template creates a migration that will create a table
and drop the table by default. If that's not what you want
feel free to name the table anything and delete the generated
code

Example: ${chalk.bold.underline('MakeThisPlural')}
`,
        default: 'Example',
      });
    }

    this.prompt(prompts).then((props) => {
      Object.keys(props).forEach((key) => {
        this[key] = props[key];
      });

      done();
    })
  }

  writing() {
    const migrationNameDashed = this.migrationName.toLowerCase().replace(/ /g, '-');
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = (now.getUTCMonth() + 1 < 10 ? '0' : '') + (now.getUTCMonth() + 1);
    const day = (now.getUTCDate() + 1 < 10 ? '0' : '') + now.getUTCDate();
    const hours = (now.getUTCHours() + 1 < 10 ? '0' : '') + now.getUTCHours();
    const minutes = (now.getUTCMinutes() + 1 < 10 ? '0' : '') + now.getUTCMinutes();
    const seconds = (now.getUTCSeconds() + 1 < 10 ? '0' : '') + now.getUTCSeconds();

    let milli = now.getUTCMilliseconds();
    if (milli < 100) {
      if (milli < 10) {
        milli = '00' + milli;
      } else {
        milli = '0' + milli;
      }
    }

    const milliseconds = milli;

    const prefix = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    const fileName = `${prefix}-${migrationNameDashed}.js`;

    this.fs.copyTpl(
      this.templatePath('migration.js'),
      this.destinationPath(`./migrations/${fileName}`),
      {
        migrationName: this.migrationName,
        tableName: this.tableName,
      }
    );
  }

  end() {
    this.log(
      `${chalk.green('Done!')}`
    );
  }
}