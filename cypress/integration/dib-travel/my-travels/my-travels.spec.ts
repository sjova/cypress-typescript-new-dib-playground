import { getTestingEnvironment } from '@cy/helpers';
import { DibTravelAccounts } from '@cy/models';

describe('My travels', () => {
  let accounts: DibTravelAccounts;

  let testingEnvironment: string;

  let myTravelsDate: string;
  let myTravelsPrice: string;

  before(() => {
    testingEnvironment = getTestingEnvironment();

    if (testingEnvironment === 'staging') {
      myTravelsDate = ' 24 Jun 2021 ';
      myTravelsPrice = ' 1RSD';
    } else if (testingEnvironment === 'ci') {
      myTravelsDate = ' 2 Apr 2021 ';
      myTravelsPrice = ' 1RSD';
    } else {
      // TODO: Revisit this on production
    }

    cy.fixture('dib-travel-accounts').then((accountsFixture) => {
      accounts = accountsFixture;
    });
  });

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

    cy.get('app-my-travels dib-travels-list dib-input input').type(`${accounts.defaultAccount.firstName}`);

    cy.get('app-my-travels dib-travels-list .name').should(
      'have.text',
      `${accounts.defaultAccount.firstName} ${accounts.defaultAccount.lastName} business trip`
    );

    cy.get('app-my-travels dib-travels-list dib-input input').clear().type('123456789');

    cy.get('app-my-travels dib-travels-list .empty-trips-section').should(
      'have.text',
      ' There are no past travels to be shown currently '
    );
  });

  it('should check sorting by price', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list .clickable').contains(' Price ').click();

    cy.get('app-my-travels dib-travels-list .uppercase').eq(1).should('have.text', myTravelsPrice);

    cy.get('app-my-travels dib-travels-list .clickable').contains(' Price ').click();

    cy.get('app-my-travels dib-travels-list .uppercase').eq(1).should('not.have.text', myTravelsPrice);
  });

  it('should check sorting by date', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list .uppercase').eq(0).should('contain', myTravelsDate);

    cy.get('app-my-travels dib-travels-list .clickable').contains(' Travel date ').click();

    cy.get('app-my-travels dib-travels-list .uppercase').eq(0).should('not.contain', myTravelsDate);
  });

  it('should open view more section', () => {
    cy.get('app-my-travels .tab-nav-bar').contains(' Past ').click();

    cy.get('app-my-travels dib-travels-list dib-input input').type(`${accounts.defaultAccount.firstName}`);

    cy.get('app-my-travels dib-travels-list .item .name')
      .contains(`${accounts.defaultAccount.firstName} ${accounts.defaultAccount.lastName} business trip`)
      .parents('dib-travels-list')
      .find('a .button__label')
      .contains('View more')
      .click();

    cy.get('dib-trip-wrapper dib-cart dib-cart-payment-section .status').should(
      'have.text',
      ' PAID & CONFIRMED TRAVEL '
    );
  });

  // TODO: Should be uncomment when we have more PAST booking on staging env

  /*it('should check pagination on Past travels page', () => {
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
  });*/
});
