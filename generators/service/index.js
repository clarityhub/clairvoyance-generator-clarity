const chalk = require('chalk');
const glob = require('glob');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('serviceName', {
      type: String,
      // Not required because we will prompt for it
      required: false,
    });
  }

  prompting() {
    const done = this.async();

    this.log(
      `${chalk.bold.underline('Creating a new service')}…`
    );

    if (this.options.serviceName) {
      this.serviceName = this.options.serviceName;
      done();
      return;
    }

    const prompts = [{
      type: 'input',
      name: 'serviceName',
      message: 
      `What is the name of your service?
\tTypically a service name is one word, but if you require a multi-word
\tservice name, use underscores to delimit the words.

\tExample: my_cool_name
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
    const serviceNameDashed = this.serviceName.replace(/_/g, '-');
    const serviceNameCapitalized = this.serviceName.replace(/_/g, ' ').replace(/(^| )(\w)/g, function (x) {
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
      this.destinationPath(`./service-${serviceNameDashed}`),
      {
        serviceName: this.serviceName,
        serviceNameDashed,
        serviceNameCapitalized,
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
2. Copy your jwt-secret.pem from another service into this one
`
    );
  }
}
