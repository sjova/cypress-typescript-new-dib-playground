/* index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Local Playground</title>
  </head>
  <body>
    <div data-test-id="test-example" class="example">
      <button id="query-btn" class="query-btn btn btn-primary">Button</button>
    </div>
  </body>
</html>
*/

/*
describe('Local Playground - Querying', () => {
  it('should demonstrate get in local playground', () => {
    // https://www.npmjs.com/package/lite-server
    cy.visit('http://localhost:3000/');

    cy.get('#query-btn').should('contain', 'Button');
    cy.get('.query-btn').should('contain', 'Button');

    cy.get('[data-test-id="test-example"]').should('have.class', 'example');
    cy.get('[data-test-id="test-example"]').invoke('attr', 'data-test-id').should('equal', 'test-example');

    cy.get('[data-test-id="test-example"]').invoke('css', 'position').should('equal', 'static');

    cy.get('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static');
  });
});
 */
