# Z-Brain ESLint Rules

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
