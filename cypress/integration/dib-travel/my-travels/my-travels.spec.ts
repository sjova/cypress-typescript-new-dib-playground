describe('My travels', () => {
  beforeEach(() => {
    cy.login();

    cy.get('dib-navbar .home-page').contains(' My Travels ').click();
  });

  it('should display "My Travels" in the navbar', () => {
    cy.get('dib-navbar .navbar__content').contains(' My Travels ').should('exist');
  });

  it('should displays message that there are no active travels', () => {
    cy.get('app-my-travels dib-travels-list .table-container.empty-list .empty-trips-section').should(
      'contain',
      " You don't have any active travels, but you can always create one "
    );
  });

  it('should displays button to create new travel', () => {
    cy.get('app-my-travels dib-travels-list .table-container.empty-list .dib-button-new').should(
      'contain',
      'Create new travel '
    );
  });

  it('should check search for past travels', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list dib-input input').type('CYQA');

    cy.get('app-my-travels dib-travels-list .name').should('have.text', 'CYQA Bot bussines trip');

    cy.get('app-my-travels dib-travels-list dib-input input').clear().type('123456789');

    cy.get('app-my-travels dib-travels-list .empty-trips-section').should(
      'have.text',
      ' There are no past travels to be shown currently '
    );
  });

  it('should check sorting by price', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list .clickable').contains(' Price ').click();

    cy.get('app-my-travels dib-travels-list  .uppercase').eq(1).should('contain', '2', '764,82');

    cy.get('app-my-travels dib-travels-list .clickable').contains(' Price ').click();

    cy.get('app-my-travels dib-travels-list  .uppercase').eq(1).should('not.contain', '2 764,82');
  });

  it('should check sorting by date', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list .uppercase').eq(0).should('contain', ' 2 Apr 2021 ');

    cy.get('app-my-travels dib-travels-list .clickable').contains(' Travel date ').click();

    cy.get('app-my-travels dib-travels-list .uppercase').eq(0).should('not.contain', ' 2 Apr 2021 ');
  });

  it('should open view more section', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list .item .name')
      .contains('sub_981ba1a0-f9cc-48f0-9644-1343d6e70929')
      .parents('dib-travels-list')
      .find('a .button__label')
      .contains('View more')
      .click();

    cy.get('dib-cart-wrapper dib-cart2 dib-cart-payment-section .status').should(
      'have.text',
      ' PAID & CONFIRMED TRAVEL '
    );
  });

  it('should check pagination on Past travels page', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('1')
      .should('have.css', 'color', 'rgb(33, 33, 33)');

    cy.get('app-my-travels dib-travels-list page-pagination ul li').contains('2').click();
    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('2')
      .should('have.css', 'color', 'rgb(33, 33, 33)');

    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('1')
      .should('have.css', 'color', 'rgb(179, 181, 184)');

    cy.get('app-my-travels dib-travels-list page-pagination i').contains('keyboard_arrow_right').click();
    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('3')
      .should('have.css', 'color', 'rgb(33, 33, 33)');

    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('2')
      .should('have.css', 'color', 'rgb(179, 181, 184)');

    cy.get('app-my-travels dib-travels-list page-pagination ul li').contains('1').click();
    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('1')
      .should('have.css', 'color', 'rgb(33, 33, 33)');

    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('3')
      .should('have.css', 'color', 'rgb(179, 181, 184)');

    cy.get('app-my-travels dib-travels-list page-pagination i').contains('last_page').click();
    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('1')
      .should('have.css', 'color', 'rgb(179, 181, 184)');

    cy.get('app-my-travels dib-travels-list page-pagination i').contains('first_page').click();
    cy.get('app-my-travels dib-travels-list page-pagination ul li')
      .contains('1')
      .should('have.css', 'color', 'rgb(33, 33, 33)');

    cy.get('app-my-travels dib-travels-list page-pagination span').contains('30').click();
    cy.get('app-my-travels dib-travels-list page-pagination span')
      .contains('30')
      .should('have.css', 'color', 'rgb(33, 33, 33)');
  });
});
