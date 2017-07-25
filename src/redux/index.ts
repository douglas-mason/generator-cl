import GeneratorClass = require('yeoman-generator');
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as fs from 'fs';



export = class ReduxGenerator extends GeneratorClass {

  options: {
    name: string;
  };

  constructor(args: any, opts: any) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  async writing() {
    const name = this.options.name;
    const cwd = process.cwd();
    const folderPath = path.join(cwd, name);

    mkdirp.sync(folderPath);

    const pascalCase = (str: string) => {
      const camel = _.camelCase(str);
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    };


    const data = {
      name,
      kebabName: _.kebabCase(name),
      pascalName: pascalCase(name),
      camelName: _.camelCase(name),
      allCapsName: _.snakeCase(name).toUpperCase()
    };

    /**
     * copy + hydrate templates
     */
    fs.readdirSync(path.join(__dirname, 'templates')).forEach(templateFile => {
      const portions = templateFile.split('.');
      portions.pop(); // remove .template
      const suffix = portions.join('.');

      this.fs.copyTpl(
        this.templatePath(templateFile),
        path.join(folderPath, suffix === 'index.ts' ? suffix : `${name}.${suffix}`),
        data
      );
    });

  }

}