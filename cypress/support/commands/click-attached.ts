/**
 * TODO: Revisit usage of this later
 *
 * Angular elements may get detached between when we find them and when `.click()` is called.
 * Here we use JQuery `.trigger('click')` right after ensuring the element is attached.
 * Note that we no longer use the original cypress `.click()` API.
 */
export const clickAttached = (subject: HTMLElement): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.wrap(subject).should(($el) => {
    expect(Cypress.dom.isAttached($el)).to.be.true;

    return $el.trigger('click');
  });
