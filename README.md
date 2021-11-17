# Z-Brain ESLint Rules

<p>
  <a target="_blank" href="https://github.com/z-brain/eslint-plugin-z-brain/actions?query=workflow%3A%22Build%22">
    <img alt="Build status" src="https://github.com/z-brain/eslint-plugin-z-brain/workflows/Build/badge.svg">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/@z-brain/eslint-plugin-z-brain">
    <img alt="NPM version" src="https://img.shields.io/npm/v/@z-brain/eslint-plugin-z-brain.svg">
  </a>
  <a target="_blank" href="https://codecov.io/gh/z-brain/eslint-plugin-z-brain">
    <img alt="Code Coverage" src="https://codecov.io/gh/z-brain/eslint-plugin-z-brain/branch/master/graph/badge.svg">
  </a>
  <a target="_blank" href="https://www.gnu.org/licenses/gpl-3.0">
    <img alt="License: GPL v3" src="https://img.shields.io/badge/License-GPLv3-blue.svg">
  </a>
</p>

Custom ESLint rules that are being used in Z-Brain projects. Some of them are project-specific, some are helpful anywhere.

*Notice: If you have any propositions feel free to make an issue or create a pull request.*

## How to use

### Installing

`yarn add @z-brain/eslint-plugin-z-brain`  
or  
`npm i -s @z-brain/eslint-plugin-z-brain`

## Rules

### `empty-array-check-with-absent-length`

#### Short description:

Protects against forgotten '.length' when checking an array for emptiness

#### Detailed description:

The condition result being never changed according to current typings.
Add `.length` or if you're writing a check for a falsy-value please add an appropriate type to the array definition.

#### Examples

See all cases & examples in the [unit tests](./blob/master/src/rules/empty-array-check-with-absent-length.rule.spec.ts).

```ts
function foo(ids: number[]) {
  if (ids.length) return; // GOOD
  if (ids) return;        // BAD
}
```

```ts
// GOOD
function foo(ids: number[] | null | undefined) {
  if (ids) return;
}
function foo(ids: number[] | boolean) {
  if (ids) return;
}
function foo(ids?: number[]) {
  if (ids) return;
}

// BAD
function foo(ids: number[]) {
  if (ids) return; // in accordance with typings 'ids' is always trusty-value 
}
```

## Helpful links

- [AST explorer](https://astexplorer.net/)

#### Articles
- [Simplest rule: Create a custom eslint rule with typescript](https://dev.to/bwca/create-a-custom-eslint-rule-with-typescript-4j3d)
- [More details: How I learned to love the AST](https://dev.to/alexgomesdev/writing-custom-typescript-eslint-rules-how-i-learned-to-love-the-ast-15pn)
- [The most complex article: How to write an ESLint plugin in TypeScript](https://dev.to/darraghor/how-to-write-an-eslint-plugin-in-typescript-3k5a)

#### Documentation & repos
- [Awesome official guide @typescript-eslint/experimental-utils · GitHub](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/development/CUSTOM_RULES.md#writing-rules-in-typescript)
- [Lots of good & simple examples: eslint-plugin-nestjs-typed package - GitHub](https://github.com/darraghoriordan/eslint-plugin-nestjs-typed)
- [Official ESLint custom rules guide](https://eslint.org/docs/developer-guide/working-with-rules)
- [Description of all packages in @typescript-eslint · GitHub](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/development/architecture/PACKAGES.md)
- [Using the Compiler API · microsoft/TypeScript Wiki · GitHub](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#using-the-type-checker)
- [More about type checking via TS Compiler API](https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api/#getting-type-information)
- 
## Development notes

### Quick Start

```bash
cd /Users/volumes/code/z-brain
git clone git@github.com:z-brain/eslint-plugin-z-brain.git
cd eslint-plugin-z-brain
yarn install
```

### How to use NodeJS version from the `.nvmrc`

1. Install NVM
2. Use `.nvmrc` file one of the next ways:

    * Execute `nvm use` in the project root directory
    * Install [NVM Loader](https://github.com/korniychuk/ankor-shell) and your .nvmrc will be loaded automatically when you open the terminal.
      ![NVM Loader demo](./resources/readme.nvm-loader.png)

### How to make a build

`yarn run build`

### How to run lint

Notice: _linter isn't configured yet_

* Just show problems `yarn run lint`
* Fix problems if it is possible `yarn run lint:fix`

### How to run tests

* All tests

  `yarn run test`  
  `yarn run test:watch`
* Specific tests

  `yarn run test src/my.spec.ts`  
  `yarn run test:watch src/my.spec.ts`

### How to build and publish NPM package

*NPM Token:* `npm_UVqN......qTww`

CI configuration details here: [.github/workflows/npmpublish.yml](.github/workflows/npmpublish.yml)

```bash
npm run pre-push \
&& npm version patch -m 'Update package version version to %s' \
&& npm run gen-public-package.json \
&& cp README.md dist/ \
&& npm publish dist --access public \
&& git push --no-verify && git push --tags --no-verify
```

### How to build package to local installation

1. `yarn run build`
2. Then you can install a local package build from the root repo dir (not `dist`) path `file:.../eslint-plugin-z-brain`.

## Author

| [<img src="https://www.korniychuk.pro/avatar.jpg" width="100px;"/><br /><sub>Anton Korniychuk</sub>](https://korniychuk.pro) |
| :---: |
