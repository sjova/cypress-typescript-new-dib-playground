describe('Group', () => {
  beforeEach(() => {
    cy.login();

    cy.get('home dib-product-pickers dib-tabs-header .label').contains('Group').click();
  });

  it('should display "Group" in the navbar', () => {
    cy.get('home dib-product-pickers dib-tabs-header .label').contains('Group').should('exist');
  });

  it('should display Group page', () => {
    cy.get('home dib-all-products-product-picker .gos-banner__title').should(
      'contain',
      'Planning a Company conference or Event?'
    );

    cy.get('home dib-all-products-product-picker .gos-banner__description').should(
      'have.text',
      "Are you looking for the best deals for your Company conference, Event or Group trip? ... we've got you covered!"
    );
  });

  it('should display link "Learn more"', () => {
    cy.get('home dib-all-products-product-picker .gos-banner__learn-more')
      .should('have.attr', 'href')
      .and('include', 'https://dibtravel.com/dib-meetings-events/');
  });
});
