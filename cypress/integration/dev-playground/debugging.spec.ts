describe('Debugging', () => {
  it('should demonstrate an example when we use JavaScript "debugger" keyword', () => {
    cy.visit('https://example.cypress.io/commands/actions');

    cy.get('.action-email').then((selectedElement) => {
      console.log(selectedElement);
      // debugger; // Uncomment this line and open the Chrome Dev Tools console in Test Runner to see in action
    });
  });

  it('should demonstrate an example when we use Cypress ".debug()" command', () => {
    cy.visit('https://example.cypress.io/commands/actions');

    // cy.get('.action-email').debug(); // Uncomment this line and open the Chrome Dev Tools console in Test Runner to see in action
  });

  it('should demonstrate an example when we use Cypress ".pause()" command', () => {
    cy.visit('https://example.cypress.io/commands/actions');

    // cy.pause(); // Uncomment this line and open the Chrome Dev Tools console in Test Runner to see in action

    cy.get('.action-email');
  });
});
