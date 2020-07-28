import * as Generator from 'yeoman-generator'
import * as path from 'path'
import * as proc from 'process'
import yosay = require('yosay')
import * as chalk from 'chalk'
import * as ora from 'ora'

class CDKGenerator extends Generator {
  public spinner: ora.Ora

  constructor(args, options) {
    super(args, options)

    this.argument('project', {
      description: `The name of the CDK project (e.g. 'hello-world')`,
      type: String,
      optional: true,
      default: path.basename(proc.cwd())
    })

    this.appname = this.options.appname
    this.spinner = ora('Configuring (this may can take several minutes) ...')
  }

  get initializing(): object {
    const hello = (): void => {
      // say yo
      this.log(
        yosay(`${chalk.blue('Greetings Sir!')} Let's get your project started.`)
      )
    }

    return {
      hello
    }
  }

  paths(): void {
    this.sourceRoot(path.resolve(__filename, '../../../templates/'))
  }

  prompting(): void {
    const cb = this.async()

    const prompts = [
      {
        type: 'input',
        name: 'app',
        message: `What is the name of your new app?`,
        default: this.appname,
        store: true
      }
    ]

    this.prompt(prompts).then(({}) => {
      cb()
    })
  }

  configuring(): void {
    this.spinner.start()

    this.spinner.succeed('configured')
  }

  writing(): void {}

  end(): void {
    return
  }
}

module.exports = CDKGenerator
