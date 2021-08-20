# cypress-typescript-new-dib-playground

Cypress TypeScript DIB Playground

## System Requirements

Operating System: **macOS Catalina 10.15.7 (19H1217)**

IDE: **Visual Studio Code 1.59.0**

```
git --version
git version 2.33.0

nvm --version
0.38.0

node --version
v14.17.5

npm --version
6.14.14

yarn --version
1.22.11
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

DIB Travel Accounts fixture is located here: `cypress/fixtures/dib-travel-accounts.json`. The interface (type) for this fixture is located here: `cypress/models/dib-travel-accounts.ts` (this fixture is stored externally). And these two files should not be modified.

## Cypress Config Notes

- `"defaultCommandTimeout": 14000` - revisit this later when we speed up the Angular front-end application (current Angular loading time is around 4-6-12 seconds, and we added 2 seconds on top of that)
- `"requestTimeout": 12000` - revisit this later when we speed up the front-end Angular application

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
