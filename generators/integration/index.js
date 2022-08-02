const chalk = require('chalk');
const glob = require('glob');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('integrationName', {
      type: String,
      // Not required because we will prompt for it
      required: false,
    });
  }

  prompting() {
    const done = this.async();

    this.log(
      `${chalk.bold.underline('Creating a new integration')}…`
    );

    if (this.options.integrationName) {
      this.integrationName = this.options.integrationName;
      done();
      return;
    }

    const prompts = [{
      type: 'input',
      name: 'integrationName',
      message:
      `What is the name of your integration?

Typically an integration name is one word, but if you require a multi-word
integration name, use underscores to delimit the words.

Example: ${chalk.bold.underline('website_chat')}
`,
      default: 'example',
    }];

    this.prompt(prompts).then((props) => {
      Object.keys(props).forEach((key) => {
        this[key] = props[key];
      });

      done();
    });
  }

  writing() {
    const integrationNameDashed = this.integrationName.replace(/_/g, '-');
    const integrationNameCapitalized = this.integrationName.replace(/_/g, ' ').replace(/(^| )(\w)/g, function (x) {
      return x.toUpperCase();
    });

    this.fs.copyTpl(
      glob.sync(
        `${this.templatePath()}/**`,
        {
          dot: true,
          ignore: '**/.DS_Store',
        }
      ),
      this.destinationPath(`./integration-${integrationNameDashed}`),
      {
        integrationName: this.integrationName,
        integrationNameDashed,
        integrationNameCapitalized,
      }
    );
  }

  end() {
    this.log(
      `
${chalk.green('Done!')}

🎉🎉🎉🎉

Things to do:

1. Update settings.json, settings.example.json, and ci/deploy to make sure all the
   services you need are correctly listed
2. In settings.json and settings.example.json, set your:
  - token
  - clientId
  - clientSecret
`
    );
  }
}
