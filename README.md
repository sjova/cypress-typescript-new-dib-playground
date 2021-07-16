# cypress-typescript

Cypress TypeScript Project

## System Requirements

Operating System: **macOS Catalina 10.15.7 (19H1217)**

IDE: **Visual Studio Code 1.56.2**

```
git --version
git version 2.32.0

nvm --version
0.38.0

node --version
v14.17.0

npm --version
6.14.13

yarn --version
1.22.10
```

## Getting Started

Initially, you need to run `yarn install`. After that, you can execute Cypress with one of these two npm scripts: `yarn cy:open` or `yarn cy:run`.

### Visual Studio Code Extensions

- [Cypress Fixture-IntelliSense](https://marketplace.visualstudio.com/items?itemName=JosefBiehler.cypress-fixture-intellisense): Supports your [cy.fixture\(\)](https://docs.cypress.io/api/commands/fixture) and [cy.route\(..., "fixture:"\)](https://docs.cypress.io/api/commands/route) commands by providing intellisense for existing fixtures.
- [Cypress Helper](https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper): Various helpers and commands for integration with Cypress.
- [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets): Useful Cypress code snippets.
- [Open Cypress](https://marketplace.visualstudio.com/items?itemName=tnrich.vscode-extension-open-cypress): This allows you to open Cypress specs and single `it()` blocks directly from VS Code.
- [Test Utils](https://marketplace.visualstudio.com/items?itemName=chrisbreiding.test-utils): Easily add or remove `.only` and `.skip` modifiers with keyboard shortcuts or the command palette.

The above extensions are included in the project recommended extensions configuration file.

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

DIB Travel Accounts fixture is located here: `cypress/fixtures/dib-travel-accounts.json`. This fixture is stored externally.

## Cypress Config Notes

- `"waitForAnimations": false` - revisit this later

## Useful Docs

- Getting Started

  - [Installing Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
  - [Writing Your First Test](https://docs.cypress.io/guides/getting-started/writing-your-first-test)
  - [Testing Your App](https://docs.cypress.io/guides/getting-started/testing-your-app#Get-started)

- Tooling

  - [TypeScript](https://docs.cypress.io/guides/tooling/typescript-support)
  - [IDE Integration](https://docs.cypress.io/guides/tooling/IDE-integration)

- Core Concepts

  - [Writing and Organizing Tests](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
  - [The Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner#Overview)

- Guides

  - [Debugging](https://docs.cypress.io/guides/guides/debugging)

- References

  - **[Best Practices](https://docs.cypress.io/guides/references/best-practices)**
  - [Assertions](https://docs.cypress.io/guides/references/assertions)
  - [Bundled Tools](https://docs.cypress.io/guides/references/bundled-tools)
  - [Error Messages](https://docs.cypress.io/guides/references/error-messages)

- **[Recipes](https://docs.cypress.io/examples/examples/recipes)**
- **[FAQ Using Cypress](https://docs.cypress.io/faq/questions/using-cypress-faq)**
