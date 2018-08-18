# generator-cl [![npm version](https://badge.fury.io/js/generator-cl.svg)](https://badge.fury.io/js/generator-cl)

To install:

```shell
yarn add generator-cl --dev
```

## Contributing a new generator

To add a new generator (like `cl:controller`), just add a folder with the same name
to the `src` directory (so, `src/controller`), and have an `index.ts` file export
a generator class. See `src/comp/index.ts` for an example.


## Generators

The following can be used via...

```shell
yo cl:<component> <...params>
```

### `comp` (angularjs component)

Lets say we want to make a component called `task-list`, and
attach it to the `clPlatform.app` module.
After changing to your desired directory, run the following...

```shell
yo cl:comp task-list app
```

This will generate the following folder:

```
task-list
├── task-list.component.ts
├── task-list.styles.scss
└── task-list.view.html
```

Now, just add an `import ./task-list/task-list.component.ts';` to `clPlatform.app`.