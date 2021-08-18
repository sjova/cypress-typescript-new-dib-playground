Please write E2E tests in Cypress for the following feature: **Parent Feature/Sub Feature**

We're using the following structure:

- Example feature: **Parent Feature/Sub Feature**
- Test folder and test file: `cypress/integration/dib-travel/parent-feature/sub-feature.spec.ts`
  - Additional Information - if needed: `cypress/integration/dib-travel/parent-feature/sub-feature-additional-information.spec.ts`
- Test _Describe_ label: "Parent Feature - Sub Feature (Additional Information - if needed)" (we're using Title Case/Capitalized Case here)
  - This pattern will be used later for filtering
- Fixture (if needed): `cypress/fixtures/parent-feature/<descriptive-file-name>.json` (pay attention on descriptive file name)
  - Only globally shared JSON data can be placed in `cypress/fixtures`
- Models (if needed): `cypress/models/parent-feature/<descriptive-file-name>.ts ` (pay attention on descriptive file name)
  - Only globally shared models can be placed in `cypress/models`
- Branch name: `feature/parent-feature/sub-feature`

You can do the same for more nesting levels: **Parent Feature/First Sub Feature/Second Sub Feature/Third Sub Feature** etc.

When you're done, please create Pull Request.
