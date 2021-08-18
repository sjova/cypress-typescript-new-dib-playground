// Reference:
// https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/blogs__iframes/cypress/integration/single-its-spec.js
// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/blogs__iframes
// https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
// https://github.com/cypress-io/cypress/issues/136
// https://github.com/cypress-io/cypress/issues/685
// https://gitlab.com/kgroat/cypress-iframe
// https://docs.cypress.io/guides/guides/web-security#Set-chromeWebSecurity-to-false
// https://www.npmjs.com/package/cypress-iframe
// https://www.nicknish.co/blog/cypress-targeting-elements-inside-iframes
// https://bahr.dev/2019/09/02/testing-stripe-elements/
// https://www.mikefettes.com/blog/cypress-and-stripe-payments-testing
// https://medium.com/@michabahr/testing-stripe-elements-with-cypress-5a2fc17ab27b
// https://medium.com/@you54f/configuring-cypress-to-work-with-iframes-cross-origin-sites-afff5efcf61f

export const switchToIframe = (iframeSelector: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  // get the `iframe > document > body`, and retry until the body element is not empty

  cy.log('switchToIframe');

  return (
    cy
      .get(iframeSelector, { log: false })
      .its('0.contentDocument.body', { log: false })
      .should('not.be.empty')
      // wraps "body" DOM element to allow chaining more Cypress commands, like `.find(...)`
      .then((body) => cy.wrap(body, { log: false }))
  );
};
