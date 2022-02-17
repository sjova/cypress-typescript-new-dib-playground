# dib-customer-web-e2e

DIB customer web end-to-end tests

## System Requirements

Operating System: **macOS Big Sur 11.6.3**

IDE: **Visual Studio Code 1.64.2 (Universal)**

```
git --version
git version 2.35.1

nvm --version
0.39.1

node --version
v16.14.0

npm --version
8.5.0

yarn --version
1.22.17

npx cypress --version
Cypress package version: 9.5.0
Cypress binary version: 9.5.0
Electron version: 15.3.4
Bundled Node version: 16.5.0
```

## Getting Started

Initially, you need to run `yarn install`. After that, you can execute Cypress with one of these two npm scripts: `yarn cy:open` or `yarn cy:run`.

## Visual Studio Code Recommended Extensions

This project has a recommended list of extensions, and you will be prompted to install them when you open the project for the first time.

You can find more details about this here: [Workspace recommended extensions](https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommended-extensions).

## Visual Studio Code Recommended Settings

These are the recommended project settings:

```json
{
  "editor.bracketPairColorization.enabled": true,
  "editor.codeActionsOnSave": ["source.fixAll", "source.organizeImports"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.guides.bracketPairs": "active",
  "editor.renderWhitespace": "all",
  "files.exclude": {
    ".husky": true,
    ".vscode": true,
    "**/node_modules": true
  },
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "workbench.editor.highlightModifiedTabs": true,
  "workbench.startupEditor": "none"
}
```

You can find more details about this here: [User and Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings).

## Prettier & ESLint

This project uses [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/). IDE editors with appropriate support or extensions will run linters. Also, you can use `yarn prettier` and `yarn eslint`. And just in case, we run Prettier and ESLint against staged git files.

## Cypress Integration Tests

- `cypress/integration/examples/*.spec.js` - some sample tests around key Cypress concepts
- `cypress/integration/playground/*.spec.js` - some playground tests

## Cypress Test Structure

The test interface, borrowed from [Mocha](https://docs.cypress.io/guides/references/bundled-tools#Mocha), provides `describe()`, `context()`, `it()` and `specify()`.

`context()` is identical to `describe()` and `specify()` is identical to `it()`.

We will use `describe()` and `it()` in our tests.

## Cypress Config

```json
{
  "$schema": "https://on.cypress.io/cypress.schema.json",
  "baseUrl": "https://example.cypress.io",
  "env": {
    "exampleVariable": "foo"
  },
  "pluginsFile": "cypress/plugins/index.ts",
  "supportFile": "cypress/support/index.ts",
  "testFiles": "**/*.spec.ts",
  "video": false,
  "viewportHeight": 720,
  "viewportWidth": 1280,
  "ignoreTestFiles": ["**/examples/*.spec.ts", "**/playground/*.spec.ts"]
}
```

## Cypress Cache Command

- `npx cypress cache path` - Print the `path` to the Cypress cache folder
- `npx cypress cache list` - Print all existing installed versions of Cypress
- `npx cypress cache clear` - Clear the contents of the Cypress cache
- `npx cypress cache prune` - Deletes all installed Cypress versions from the cache except for the currently installed version

[Clear Cypress cache](https://docs.cypress.io/guides/references/troubleshooting#Clear-Cypress-cache)

## JSDoc Example

```ts
/**
 * @deprecated Use `cy.abc()` instead.
 *
 * @todo Write the documentation.
 *
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit
 *
 * @param {string} name - User name
 * @param {number} age - Age of the user
 * @param {CustomOptions} [options] Pass some options object to change the default behavior of `cy.xyz()`
 * @returns some result
 * @example
 *    cy.foo('example123')
 */
```

## Iframe Support

We're testing features with iframes in separated directory: `cypress/integration/dib-travel-iframe/*` (inner structure is same as in: `cypress/integration/dib-travel/*`)

In current configuration, iframe testing working only with this two npm scripts:

- `cy:open:iframe`
- `cy:run:dib:iframe`

Since Cypress has limited support for testing iframes at this moment, we created a custom command: `.switchToIframe()` with which you can switch to the contents of the iframe. Naming following open proposal for official Cypress command, which should be supported in the near future.

And one last thing, you need to include `cy.iframeFix()` inside `beforeEach()`.

Here you can find a few demo examples: `cypress/integration/dib-travel-iframe/iframe-demo/*`.

## Electron Headless Testing Examples

- `yarn cy:spec cypress/integration/dib-travel/<parent-feature>/<sub-feature>.spec.ts` - run single feature test headlessly
- `yarn cy:spec cypress/integration/dib-travel/<parent-feature>/<sub-feature>/<nested-feature>.spec.ts` - run single nested test headlessly
- `yarn cy:spec cypress/integration/dib-travel/<parent-feature>/*.spec.ts` - run all feature tests headlessly
- `yarn cy:spec cypress/integration/dib-travel/<parent-feature>/**/*.spec.ts` - run all feature and nested tests headlessly
- `yarn cy:run:dib` - run all DIB tests headlessly
- `yarn cy:run:dib:iframe`- run all DIB Iframe tests headlessly

## Globs

Glob patterns specify sets of filenames with wildcard characters.

### Segments and separators

A segment is everything between separators. The separator in a glob is always the / character - regardless of the operating system.

### Special character: \* (single-star)

Matches any amount (including none) of characters within a single segment. Useful for globbing files within one directory.

This glob will match files like `index.js`, but not files like `scripts/index.js` or `scripts/nested/index.js`

### Special character: \*\* (double-star)

Matches any amount (including none) of characters across segments. Useful for globbing files in nested directories. Make sure to appropriately restrict your double-star globs, to avoid matching large directories unnecessarily.

Here, the glob is appropriately restricted to the `scripts/` directory. It will match files like `scripts/index.js`, `scripts/nested/index.js`, and `scripts/nested/twice/index.js`.

## Angular Components

- `app-root` - Angular root (main) component
- `router-outlet` - Angular router component
- `dib-*` - DIB components
- `ui-*` - DIB UI/UX components

## Helper Selectors

- `body .example-class-name` - Selects all elements with `class="example-class-name"`
- `body #example-id-name` - Selects the element with `id="example-id-name"`
- `body *` - Selects all elements
- `body > *` - Selects all elements where the parent is a `body` element
- `body example-element` - Selects all `<example-element>` elements
- `body [example-attribute]` - Selects all elements with a `example-attribute` attribute
- `body [class^="dib-"]` - Selects all elements where `class` attribute value begins with `dib-`
- `body [id^="div-"]` - Selects all elements where `id` attribute value begins with `dib-`
- `body img:not([alt])` - Selects all `img` elements which not contain `alt` attribute
- `app-root router-outlet`

## DIB Travel Accounts

DIB Travel Accounts are stored in our shared drive here: `Dib Technology/03. Quality Assurance (QA)/Cypress/DIB Travel Accounts` and should be added separately in this file: `cypress/fixtures/dib-travel-accounts.json`. The interface (type) for this fixture is located here: `cypress/models/dib-travel-accounts.ts` (this fixture is stored externally). And these two files should not be modified.

If you skip the previous step, you will get the following error:

```sh
Error: Webpack Compilation Error
./cypress/support/commands/login.ts
Module not found: Error: Can't resolve '@cy/fixtures/dib-travel-accounts.json' in '/Users/DibUsername/Projects/cypress-typescript-new-dib-playground/cypress/support/commands'
resolve '@cy/fixtures/dib-travel-accounts.json' in '/Users/DibUsername/Projects/cypress-typescript-new-dib-playground/cypress/support/commands'
  Parsed request is a module
  using description file: /Users/DibUsername/Projects/cypress-typescript-new-dib-playground/package.json (relative path: ./cypress/support/commands)
    Field 'browser' doesn't contain a valid alias configuration
    Looked for and couldn't find the file at the following paths:
    ...
```

## Cypress Config Notes

- `"defaultCommandTimeout": 40000` - default x10, revisit this later when we speed up the Angular front-end application
- `"requestTimeout": 50000` - default x10, revisit this later when we speed up the Angular front-end application

## ToDo Decision

- revisit recommending VSCode extensions (`.vscode/extensions.json`)
- `dib-foo ui-button button` vs. `dib-foo ui-button`
- `dib-foo ui-input input` vs. `dib-foo ui-input`

# Local Playground

You can use the local playground to clarify or fully understand any Cypress command with a custom HTML structure.

First, install globally [lite-server](https://www.npmjs.com/package/lite-server).

Next, create an external `index.html` file. Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Local Playground</title>
  </head>
  <body>
    <div data-test-id="test-example" class="example">
      <button id="query-btn" class="query-btn btn btn-primary">Button</button>
    </div>
  </body>
</html>
```

And from the same folder, run the `lite server` command. Your local `index.html` file will be available at this address: [http://localhost:3000/](http://localhost:3000/).

After this step, you can write your test for specific HTML structure from your local playground. Example:

```ts
describe('Local Playground - Querying', () => {
  it('should demonstrate get in local playground', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#query-btn').should('contain', 'Button');
    cy.get('.query-btn').should('contain', 'Button');

    cy.get('[data-test-id="test-example"]').should('have.class', 'example');
    cy.get('[data-test-id="test-example"]').invoke('attr', 'data-test-id').should('equal', 'test-example');

    cy.get('[data-test-id="test-example"]').invoke('css', 'position').should('equal', 'static');

    cy.get('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static');
  });
});
```

## Cypress Reporters

We included the following Cypress reporters in the project: default [spec](https://mochajs.org/#spec), [mocha-junit-reporter](https://github.com/michaelleeallen/mocha-junit-reporter) and [mochawesome](https://github.com/adamgruber/mochawesome).

After running DIB tests headlessly (e.g., `yarn cy:run:dib`), you can generate Cypress reports with the following command: `yarn cy:report`.

This will generate multiple reports here:

- `cypress/results/combined-junit.xml`
- `cypress/results/combined-mochawesome.json`
- `cypress/reports/html/combined-mochawesome.html` - this report is most valuable for humans :)

Also, you can delete previously generated reports with the following command `yarn cy:report:delete`.

## Useful Docs

- Getting Started

  - [Installing Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
  - [Writing Your First Test](https://docs.cypress.io/guides/getting-started/writing-your-first-test)
  - [Testing Your App](https://docs.cypress.io/guides/getting-started/testing-your-app)

- Tooling

  - [TypeScript](https://docs.cypress.io/guides/tooling/typescript-support)
  - [IDE Integration](https://docs.cypress.io/guides/tooling/IDE-integration)

- Core Concepts

  - [Writing and Organizing Tests](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
  - [Conditional Testing](https://docs.cypress.io/guides/core-concepts/conditional-testing)
  - [The Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner)

- Guides

  - [Debugging](https://docs.cypress.io/guides/guides/debugging)

- References

  - **[Best Practices](https://docs.cypress.io/guides/references/best-practices)**
  - **[Assertions](https://docs.cypress.io/guides/references/assertions)**
  - [Bundled Tools](https://docs.cypress.io/guides/references/bundled-tools)
  - [Error Messages](https://docs.cypress.io/guides/references/error-messages)

- **[Kitchen Sink](https://example.cypress.io/)**
- **[Recipes](https://docs.cypress.io/examples/examples/recipes)**
- **[FAQ Using Cypress](https://docs.cypress.io/faq/questions/using-cypress-faq)**
- [API](https://docs.cypress.io/api/table-of-contents)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Cypress Changelog](https://docs.cypress.io/guides/references/changelog)
- [Cypress Roadmap](https://docs.cypress.io/guides/references/roadmap)
