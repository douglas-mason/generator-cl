import GeneratorClass = require('yeoman-generator');
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import * as path from 'path';



export = class ComponentGenerator extends GeneratorClass {

  options: {
    name: string;
    module: string;
  };

  constructor(args: any, opts: any) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
    this.argument('module', { type: String, required: true });
  }

  async writing() {
    const name = this.options.name;
    const cwd = process.cwd();
    const folderPath = path.join(cwd, name);
    const appClientIndex = folderPath.indexOf('app/client');

    if (appClientIndex === -1) {
      throw new Error(`Can only create a component in app/client`);
    }
    const appClientBase = folderPath.split('app/client/')[1];

    mkdirp.sync(folderPath);

    const templateUrl = `views/${appClientBase}/${name}.view.html`;
    const pascalCase = (str: string) => {
      const camel = _.camelCase(str);
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    };


    const baseControllerPath = `${'../'.repeat(appClientBase.split('/').length)}_shared/base-controller`;


    const data = {
      componentName: name,
      componentNameCamelCase: _.camelCase(name),
      controllerName: `${pascalCase(name)}Controller`,
      templateUrl,
      baseControllerPath,
      moduleName: 'clPlatform.' + this.options.module
    };

    /**
     * copy + hydrate templates
     */
    ;[
      'component.ts',
      'styles.scss',
      'view.html'
    ].forEach(filetype => {
      this.fs.copyTpl(
        this.templatePath(`${filetype}.template`),
        path.join(folderPath, `${name}.${filetype}`),
        data
      );
    });

  }

}