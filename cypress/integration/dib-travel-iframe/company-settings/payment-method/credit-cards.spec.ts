import { PaymentMethod } from '../../../../models';
import { getEmailWithHash } from '../../../../helpers';

describe('Company Settings - Payment Method - Credit Cards', () => {
  let creditCardForm: PaymentMethod;

  const countryDropdownItemHeight = 42; // computed item height
  const countryDropdownSerbiaPosition = 103 - 3; // to be 2nd item after scroll

  before(() => {
    cy.fixture('company-settings/payment-method').then((paymentMethodFixture) => {
      creditCardForm = {
        ...paymentMethodFixture,
        primaryContact: {
          ...paymentMethodFixture.primaryContact,
          email: getEmailWithHash(paymentMethodFixture.primaryContact.email),
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

  it('should add credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=postalCode]').type(
      creditCardForm.companyInformation.zipCode
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=city]').type(
      creditCardForm.companyInformation.city
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-dropdown').click();
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-dropdown .placeholder')
      .contains('Country')
      .parents('ui-dropdown')
      .clickAttached();
    cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
      .scrollTo(0, countryDropdownItemHeight * countryDropdownSerbiaPosition)
      .contains(creditCardForm.companyInformation.country)
      .click();
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=streetName]').type(
      creditCardForm.companyInformation.address
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=invoiceRecipientEmail]').type(
      creditCardForm.invoiceRecipient.email
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=vatNumber]').type(
      creditCardForm.companyInformation.vatNumber
    );

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=firstName]').type(
      creditCardForm.primaryContact.firstName
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=lastName]').type(
      creditCardForm.primaryContact.lastName
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog input[name=email]').type(
      creditCardForm.primaryContact.email
    );

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS:')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCardForm.creditCard.creditCardNumber);
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-expiry iframe')
      .switchToIframe()
      .find('.InputContainer input[name="exp-date"]')
      .type(`${creditCardForm.creditCard.expiryMonth}${creditCardForm.creditCard.expiryYear.slice(-2)}`);
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-cvc iframe')
      .switchToIframe()
      .find('.InputContainer input[name="cvc"]')
      .type(creditCardForm.creditCard.securityCode);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Company Shared Credit Card Added');
  });

  it('should confirm the cancellation form for adding credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button').contains('Cancel').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog').should('not.exist');
  });

  it('should not be able to submit an empty credit card form', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .error').should('contain', 'is required.');
  });

  it('should delete credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-credit-card .card__email')
      .contains(creditCardForm.primaryContact.email)
      .parents('dib-credit-card')
      .find('ui-button')
      .contains('Delete')
      .clickAttached();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Deleted');
  });
});
