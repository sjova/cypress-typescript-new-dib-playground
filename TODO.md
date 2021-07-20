# TODO

- ## Revisit **Stripe** & `iframe`
  - https://docs.cypress.io/guides/guides/web-security
  - https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/blogs__iframes
  - https://www.mikefettes.com/blog/cypress-and-stripe-payments-testing
  - https://medium.com/@michabahr/testing-stripe-elements-with-cypress-5a2fc17ab27b
  - https://bahr.dev/2019/09/02/testing-stripe-elements/
  - https://medium.com/@you54f/configuring-cypress-to-work-with-iframes-cross-origin-sites-afff5efcf61f
- Revisit relation between `"chromeWebSecurity": false` and missing header (`-H 'Origin: https://develop--dib-travel.netlify.app'`)
  - `cy.intercept('api/public/tenant/config', (req) => { req.headers['Origin'] = Cypress.config('baseUrl') as string; });`
