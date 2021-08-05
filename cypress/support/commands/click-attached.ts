/**
 * TODO: Revisit usage of this later
 *
 * Angular elements may get detached between when we find them and when `.click()` is called.
 * Here we use JQuery `.trigger('click')` right after ensuring the element is attached.
 * Note that we no longer use the original cypress `.click()` API.
 *
 * Reference:
 * https://github.com/cypress-io/cypress/issues/5743
 * https://github.com/cypress-io/cypress/issues/7306
 */
export const clickAttached = (subject: HTMLElement): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.log('clickAttached');

  return cy.wrap(subject, { log: false }).should(($el) => {
    expect(Cypress.dom.isAttached($el)).to.be.true;

    return $el.trigger('click');
  });
};
