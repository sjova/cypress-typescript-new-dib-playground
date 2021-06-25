describe('DataCy Custom Command', () => {
  it('best practices - selecting elements', () => {
    cy.visit('https://example.cypress.io/commands/querying');

    // https://on.cypress.io/best-practices#Selecting-Elements
    cy.dataCy('best-practices-selecting-elements').within(() => {
      // Worst - too generic, no context
      cy.get('button').click();

      // Bad. Coupled to styling. Highly subject to change.
      cy.get('.btn.btn-large').click();

      // Average. Coupled to the `name` attribute which has HTML semantics.
      cy.get('[name=submission]').click();

      // Better. But still coupled to styling or JS event listeners.
      cy.get('#main').click();

      // Slightly better. Uses an ID but also ensures the element
      // has an ARIA role attribute
      cy.get('#main[role=button]').click();

      // Much better. But still coupled to text content that may change.
      cy.contains('Submit').click();

      // Best. Insulated from all changes.
      cy.get('[data-cy=submit]').click();
    });
  });
});
