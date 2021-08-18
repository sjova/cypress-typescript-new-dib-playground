# Coding Style Guide

## Quick Reference

- Prefer American English over British English
- Please don't write comments in Serbian
- Display lists (options, flags, etc.) and tables in alphabetical order.
- Please use present tense imperative in Git commit messages (ex. `add tests for AAA, fix the BBB bug in CCC, correct typos in the login`)
- Please put a ticket reference at the end of the Git comment (ex. `"add tests for AAA #DT-1234"`)
- Use descriptive names whenever possible (files, variables, functions, methods, etc.)
- Please use only this file extension for test files: `*.spec.ts`
- Please use dash-case for file naming (ex. `foo-something.spec.ts`)
- Please use the descriptive file naming
- If you need a prefix in naming, please use "cy"
- Ideally, when you read `objectname.propertyName`, it should sound meaningful
- Please use camelCase for variable naming (ex. `myVariableName`)
- If the test is availably only for the agent, please add the following suffix in the test description: ` (Agent)`
- **Mocha** `describe` title should start with a capital letter
- **Mocha** `it` title should start with a lowercase letter (_it_ and _descriptive title_ together should have a meaningful meaning)
- The KISS principle (keep it simple, stupid)
- The DRY principle (do not repeat yourself)
- Please separate each meaningful code block with a new line (for better code readability)
  - ex. imports, `describe`, variables, `before/beforeEach`, `it` block, selectors/actions, page selectors, dialog selectors, `should` block, other meaningful unit/block, etc.
- Please use a separate folder for tests of each feature
- Please do not use abbreviations in your code
- Please sort all relevant items in the code in alphabetical order (A-Z order).
- For readability, we're using 120 characters as a maximum line length
- Please use single quotes over double quotes
- Please reuse repeatable code (data model, function, test case, partial test case, Cypress command, etc.)
- Please define the TypeScript interface for each data model (export and reuse same if needed)
- Instead of a long list of items in the single data model, please group meaningful groups whenever possible
- Data should reflect UI/UX in terms of naming and order of properties
- Please use appropriate JS/TS comments (`//` - Single Line Comments, `/* ... */` - Multi-line Comments)
- Please put all globally used functions to the root `helpers` folder
- Please put all functions from a single feature test to the `helpers` folder inside the origin feature
- Please put all functions from multiple feature tests to the `shared` folder inside the origin feature
- Add meaningful comments to describe your code
- Add TODO comment for temp. unused or unfinished code and map with Jira/Issues board (ex. `// TODO: Foo description (DT-1234)`)
- Simplify extensive (large function/code block) business logic into smaller chunks
- Add multiple assertions and don't worry about it
- Use existing Cypress commands that are already written instead of creating more
- Please don't use too many selectors for one single element
- Try to login as users with different permissions instead of a superuser that has all permissions
- Please try to use at least these selectors: `feature/parent-selector middle/control-selector main/children-selector`
- Please be consistent with your changes (code, naming, etc.), especially within the same group/unit/test.
- Please always define the method in the intercept command (ex. `cy.intercept('GET', '/api/employees'`)
- Please use "short" imports, since we're using `index.ts`
- Please use "fixture" suffix (ex. `fooFixture`)
- Please use `ctaButton` suffix when needed (CTA = Call-To-Action)
- Please use TypeScript Utility Types when needed (ex. `Partial<Type>`, `Pick<Type, Keys>`, `Omit<Type, Keys>`)
- Each `it` block should have at least one `.should` block (where you confirm something)
- Please note the difference between `.parent()` and `.parents() commands
- Whenever you use the traversal commands (`.find()`, `.parent()`, `.next()`, etc.), please use some selector inside of command. If you can't find a good selector, use HTML elements at least to confirm the current layout
- In a dilemma between `.find()` and `.within()` commands, please use `.find()` for a single inner selector and `.within()` for more than one inner selectors
- When you're using `.contains()` command, please reduce searchable HTML scope as much as possible (use additional selectors or other commands)
- Whenever possible, don't use **Angular** elements as a selector (example prefixes: `ng*`, `ng-*` and `routerLink`)
- Whenever possible, don't use **Angular Material** elements as a selector (example prefixes: `mat*`, `mat-*`)
- Mock or control test data as much as possible (JSON data)
- Tests should always be able to be run independently and still pass
- Clean up state before tests run (not after)
- If the test failed during test development, please manually clean up test data from the environment
- Use API route aliases or assertions to guard Cypress from proceeding until an explicit condition is met (don't use `.wait()`)
- Don't limit yourself to trying to act like a user
- Practice PR Code Review in all seniority directions (Senior -> Junior, Junior -> Senior, and all variations between)
- Make sure you would understand your code if you read it a few months from now
- Please don't copy/paste blocks from existing tests. Instead, consider reusable functions or commands.
- Please don't write dummy tests (always consider the benefit of the written test)
- Inside forms testing, we need to cover the following items: form validation (ex. validation and error messages: required, minlength/maxlength, min/max, email, input type, etc.), disabled fields (if any), help/hint text (if any), invalid form submit, valid form submit, confirm submitted data (on UI/UX if available or in sending API data)
- Inside dialogs testing, we need to cover the following items: open/launch dialog (it doesn't have to be a separate test), close/cancel the dialog (cancel or close button or both), dialog action/CTA (ex. actions: ok, submit, add, update, archive, delete, etc.)

## Branch Naming Conventions

- `bugfix/*`- Solves a bug
- `chore/*` - Other changes that don't modify cypress or test files
- `docs/*` - Adds or alters documentation
- `feature/*` - Adds a tests for a new a feature
- `refactor/*` - Rewrites or improves code

Examples:

- `bugfix/agent-login`
- `bugfix/sign-in`
- `bugfix/sign-up`
- `chore/eslint-config`
- `chore/package-prettier`
- `chore/tsconfig-config`
- `chore/vscode-extensions`
- `docs/dib-features`
- `docs/readme`
- `docs/styleguide`
- `feature/company-report/invoices`
- `feature/company-settings/payment-method/billing-profiles`
- `feature/my-travels`
- `refactor/sign-in`
- `refactor/sign-up`

## Git Pull Requests (PR)

Before you create PR or before you push changes in your PR, please make sure that you checked below items:

- Make sure that you fully follow the above-defined Coding Style Guide
- Confirm that you're covering all requirements for the specific feature
- Double-check the whole user flow for the specific feature, and re-think if you missed covering some functionality with tests.
- Please don't include sensitive data (ex. passwords, API tokens, etc.) in your commits
- Don't forget to remove `.only` and `.skip` from your tests.
- Make sure that you're using the best possible selectors in your tests
- Please skip time-consuming Cypress commands whenever is possible
- When querying elements, try to stick with `.get()` and meaningful selector
- Double-check if you can improve your code
- Please remove unnecessary or unused code from your commit
- Make sure that your environment is error-free
- Please confirm your tests in Cypress Test Runner
- Pull latest changes from the source branch
- Please add a descriptive title and description when creating PR
- Confirm your tests in Test Runner (Chrome and Electron) and run your tests headlessly (Electron) at least once
- Execute tests at least three times
- If the error(s) occurs randomly, it should be corrected
