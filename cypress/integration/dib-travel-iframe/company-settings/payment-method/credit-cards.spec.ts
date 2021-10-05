import { getEmailWithHash } from '@cy/helpers';
import { CreditCard, PaymentMethod } from '@cy/models';

describe('Company Settings - Payment Method - Credit Cards', () => {
  let creditCard: CreditCard;
  let paymentMethod: PaymentMethod;

  before(() => {
    cy.fixture('credit-card').then((creditCardFixture) => {
      creditCard = creditCardFixture;
    });

    cy.fixture('company-settings/payment-method').then((paymentMethodFixture) => {
      paymentMethod = {
        ...paymentMethodFixture,
        primaryContact: {
          ...paymentMethodFixture.primaryContact,
          email: getEmailWithHash(paymentMethodFixture.primaryContact.email),
          modifiedEmail: getEmailWithHash(paymentMethodFixture.primaryContact.modifiedEmail),
        },
        invoiceRecipient: {
          ...paymentMethodFixture.invoiceRecipient,
          email: getEmailWithHash(paymentMethodFixture.invoiceRecipient.email),
        },
      };
    });
  });

  beforeEach(() => {
    cy.iframeFix();

    cy.login();
    cy.visit('/company-management/payment-method/credit-cards');
  });

  it('should cancel the adding new credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button').contains('Cancel').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog').should('not.exist');
  });

  it('should not be able to submit an empty credit card form', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    // TODO: We should confirm one by one required fields
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .error').should('contain', 'is required.');
  });

  it('should add credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=postalCode]').type(
      paymentMethod.companyInformation.zipCode
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=city]').type(
      paymentMethod.companyInformation.city
    );

    const countryDropdownItemHeight = 42; // computed item height
    const countryDropdownSerbiaPosition = 103 - 3; // to be 2nd item after scroll
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-dropdown').click();
    cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
      .scrollTo(0, countryDropdownItemHeight * countryDropdownSerbiaPosition)
      .contains(paymentMethod.companyInformation.country)
      .click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=streetName]').type(
      paymentMethod.companyInformation.address
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethod.invoiceRecipient.email
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=vatNumber]').type(
      paymentMethod.companyInformation.vatNumber
    );

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=firstName]').type(
      paymentMethod.primaryContact.firstName
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=lastName]').type(
      paymentMethod.primaryContact.lastName
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=email]').type(
      paymentMethod.primaryContact.email
    );

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS:')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCard.visa.number);
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-expiry iframe')
      .switchToIframe()
      .find('.InputContainer input[name="exp-date"]')
      .type(`${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}`);
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-cvc iframe')
      .switchToIframe()
      .find('.InputContainer input[name="cvc"]')
      .type(creditCard.cvc);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Company Shared Credit Card Added');
  });

  // TODO: It should cancel the deleting credit card

  it('should delete credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-credit-card .card__email')
      .contains(paymentMethod.primaryContact.email)
      .parents('dib-credit-card')
      .find('ui-button')
      .contains('Delete')
      .clickAttached();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Deleted');
  });
});
