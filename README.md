## Description

The [Allohamora](https://github.com/Allohamora) cli is a command line interface with useful install scripts.

## Usage

```bash
npx @allohamora/cli
```

## Table of content

- js 
  - commitlint
  - eslint
  - husky
  - lint-staged
  - prettier
  - release-workflow
  - standard-version

## Content

### [js](https://github.com/Allohamora/cli/blob/master/src/categories/js/index.ts)

js/ts category with 2 available configs(default and node:ts).

### [commitlint](https://github.com/Allohamora/cli/blob/master/src/categories/js/commitlint.ts)*

***requires husky**

that script installs [commitlint](https://github.com/conventional-changelog/commitlint) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config.

### [eslint](https://github.com/Allohamora/cli/blob/master/src/categories/js/eslint.ts)*

***requires prettier in node:ts config**

that script installs [eslint](https://github.com/eslint/eslint) with config and lint scripts.

### [husky](https://github.com/Allohamora/cli/blob/master/src/categories/js/husky.ts)

that script installs [husky](https://github.com/typicode/husky) and initializes it.

### [lint-staged](https://github.com/Allohamora/cli/blob/master/src/categories/js/lint-staged.ts)*

***requires husky**\
***requires prettier**\
***requires eslint in node:ts config**

that script installs [lint-staged](https://github.com/okonet/lint-staged) with format files config.

### [prettier](https://github.com/Allohamora/cli/blob/master/src/categories/js/prettier.ts)

that script installs [prettier](https://github.com/prettier/prettier) with config and format scripts.

### [release-worflow](https://github.com/Allohamora/cli/blob/master/src/categories/js/release-worflow.ts)

that script installs github workflow what automatically generates a release from [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) CHANGELOG.md when you push a tag like \*.\*.\*(1.1.1, 0.1.1, 0.0.1, 0.0.0, etc).

### [standard-version](https://github.com/Allohamora/cli/blob/master/src/categories/js/standard-verstion.ts)

that script installs [standard-version](https://github.com/conventional-changelog/standard-version) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) + github(github template compare links) + git flow (tag without "v" prefix) config.
