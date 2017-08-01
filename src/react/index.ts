import GeneratorClass = require("yeoman-generator");
import * as _ from "lodash";
import * as mkdirp from "mkdirp";
import * as path from "path";
import * as fs from "fs";

export = class ReactGenerator extends GeneratorClass {
  options: {
    name: string;
    redux?: boolean;
    styleguidist?: boolean;
    dir?: string;
  };

  constructor(args: any, opts: any) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
    this.option("redux", { type: Boolean });
    this.option("styleguidist", { type: Boolean });
    this.option("dir", { type: String });
  }

  async writing() {
    const name = this.options.name;
    const cwd = this.options.dir
      ? path.join(process.cwd(), this.options.dir)
      : process.cwd();
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
      allCapsName: _.snakeCase(name).toUpperCase(),
      redux: this.options.redux
    };

    /**
     * copy + hydrate templates
     */
    fs.readdirSync(path.join(__dirname, "templates")).forEach(templateFile => {
      const portions = templateFile.split(".");
      portions.pop(); // remove .template
      const suffix = portions.join(".");

      if (!this.options.styleguidist && suffix === "component.md") {
        // skip component.md if --styleguidist option not used
        return;
      }

      if (this.options.styleguidist && suffix === "stories.tsx") {
        // skip story if using styleguidist
        return;
      }

      this.fs.copyTpl(
        this.templatePath(templateFile),
        path.join(folderPath, `${name}.${suffix}`),
        data
      );
    });
  }
};
