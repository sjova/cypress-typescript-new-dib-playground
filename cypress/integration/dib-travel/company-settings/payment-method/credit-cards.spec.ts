import { PaymentMethod } from '../../../../models';

describe('Company Settings - Payment Method - Credit Cards', () => {
  let paymentMethodForm: PaymentMethod;

  before(() => {
    cy.fixture('company-settings/payment-method-form').then((paymentMethodFormFixture) => {
      paymentMethodForm = paymentMethodFormFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/payment-method/credit-cards');
  });

  it('should display payment method in sidebar menu', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains(' Payment Method ').should('exist');
  });

  it('should submit empty form for creating credit card ', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog').should('be.visible');
  });

  it('should close dialog for creating credit card ', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button').contains('Cancel').click();

    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards h1').should(
      'contain',
      ' Credit Cards '
    );
  });

  // TODO: Blocked by bug DT-8044
  xit('should create a new credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=postalCode]').type(paymentMethodForm.zipCode);
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=city]').type(paymentMethodForm.city);
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-dropdown').click();
    // TODO: Revisit scrollTo (if any better solution)
    cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
      .scrollTo(0, 4000)
      .contains(paymentMethodForm.country)
      .click();
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=streetName]').type(paymentMethodForm.address);
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethodForm.invoiceRecipientEmail
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=vatNumber]').type(paymentMethodForm.vatNumber);
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=firstName]').type(paymentMethodForm.firstName);
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=lastName]').type(paymentMethodForm.lastName);
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=email]').type(paymentMethodForm.email);
    // TODO: iframe
    // cy.get('form input[name=cardnumber]').type(paymentMethodForm.cardNumber);
    // cy.get('form .dib-dialog-form-section input[name=exp-date]').type(paymentMethodForm.expireDate);
    // cy.get('form input[name=cvc]').type(paymentMethodForm.securityCode);
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-payment-method dib-credit-card .card__name').should(
      'contain',
      paymentMethodForm.firstName
    );
  });

  // TODO: Blocked by previous test
  xit('should delete credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-credit-card .card__name')
      .contains(paymentMethodForm.firstName)
      .parents('dib-credit-card')
      .within(() => {
        return cy.get('ui-button').contains('Delete').clickAttached();
      });

    cy.get('dib-company-management dib-payment-method dib-credit-card .card__name').should(
      'not.contain',
      paymentMethodForm.firstName
    );
  });
});
