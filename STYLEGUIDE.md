# Coding Style Guide

## Quick Reference

- Prefer American English over British English
- Please don't write comments in Serbian
- Display lists (options, flags, etc.) and tables in alphabetical order.
- Please use present tense imperative in Git commit messages (ex. add tests for AAA, fix the BBB bug in CCC, correct typos in the login)
- Please put a ticket reference at the end of the Git comment (ex. "add tests for AAA #DT-1234")
- Use descriptive names whenever possible (files, variables, functions, methods, etc.)
- Please use only this file extension for test files: `*.spec.ts`
- Please use dash-case for file naming (ex. foo-something.spec.ts)
- Please use the descriptive file naming
- Please use camelCase for variable naming (ex. myVariableName)
- **Mocha** `describe` title should start with a capital letter
- **Mocha** `it` title should start with a lowercase letter (_it_ and _descriptive title_ together should have a meaningful meaning)
- Please separate each meaningful code block with a new line (for better code readability)
- Please use a separate folder for tests of each feature
- Please do not use abbreviations in your code
- Please sort all relevant items in the code in alphabetical order (A-Z order).
- For readability, we're using 120 characters as a maximum line length
- Please use single quotes over double quotes
- Please reuse repeatable code (model, function, Cypress command, etc.)
- Please define the TypeScript interface for each data model (export and reuse same if needed)
- Add meaningful comments to describe your code
- Add TODO comment for temp. unused or unfinished code
- Simplify extensive (large function/code block) business logic into smaller chunks
- Add multiple assertions and don't worry about it
- Use existing Cypress commands that are already written instead of creating more
- Try to login as users with different permissions instead of a superuser that has all permissions
- Please try to use at least these selectors: `feature/parent-selector middle/control-selector main/children-selector`
- Please don't use **Angular** elements as a selector (example prefixes: `ng*`, `ng-*` and `routerLink`)
- Please don't use **Angular Material** elements as a selector (example prefixes: `mat*`, `mat-*`)
- Mock or control test data as much as possible (JSON data)
- Tests should always be able to be run independently and still pass
- Clean up state before tests run (not after)
- Use API route aliases or assertions to guard Cypress from proceeding until an explicit condition is met (don't use `.wait()`)
- Don't limit yourself to trying to act like a user
- Practice PR Code Review in all seniority directions (Senior -> Junior, Junior -> Senior, and all variations between)

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
- Please don't include sensitive data (ex. passwords, API tokens, etc.) in your commits
- Make sure that you're using the best possible selectors in your tests
- Please skip time-consuming Cypress commands whenever is possible
- When querying elements, try to stick with `.get()` and meaningful selector
- Double-check if you can improve your code
- Please remove unnecessary or unused code from your commit
- Make sure that your environment is error-free
- Please confirm your tests in Cypress Test Runner
- Pull latest changes from the source branch
- Please add a descriptive title and description when creating PR
