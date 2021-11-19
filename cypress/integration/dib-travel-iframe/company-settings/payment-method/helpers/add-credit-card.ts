import { CreditCard, PaymentMethod } from '@cy/models';

export const addCreditCard = (
  paymentMethod: PaymentMethod,
  creditCard: CreditCard,
  clickCreditCardCta = true
): void => {
  if (clickCreditCardCta) {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();
  }

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

  cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-expiry iframe')
    .switchToIframe()
    .find('.InputContainer input[name="exp-date"]')
    .type(`${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}`);
  cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-cvc iframe')
    .switchToIframe()
    .find('.InputContainer input[name="cvc"]')
    .type(creditCard.cvc);
};
