// Reference: https://docs.cypress.io/guides/getting-started/writing-your-first-test#Write-a-real-test

describe('The Kitchen Sink', () => {
  it('should demonstrate gets, types, and asserts', () => {
    // Visits the Kitchen Sink
    cy.visit('https://example.cypress.io/');

    // finds the content "type" and clicks the link "type"
    cy.contains('type').click();

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions');

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com');
  });
});
