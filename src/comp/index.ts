import GeneratorClass = require('yeoman-generator');
import * as _ from 'lodash';


class ComponentGenerator extends GeneratorClass {

  options: {
    name: string;
  };

  constructor(args: any, opts: any) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  writing() {
    const name = this.options.name;
    console.log(`In writing method -- ${name}`);
    this.fs.copyTpl(
      this.templatePath('template.component.ts.template'),
      this.destinationPath(`test/${name}.component.ts`),
      {
        componentName: name,
        componentNameCamelCase: _.camelCase(name),
        controllerName: `${_.capitalize(_.camelCase(name))}Controller`,
        templateUrl: 'TEST',
        baseControllerPath: 'PATH',
        moduleName: 'clPlatform.TEST'
      }
    );
  }

}

export = ComponentGenerator;