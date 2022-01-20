import { getTestingEnvironment } from '@cy/helpers';
import { CreditCard, PaymentMethod } from '@cy/models';

let testingEnvironment: string;

export const confirmAddedCreditCard = (paymentMethod: PaymentMethod, creditCard: CreditCard): void => {
  testingEnvironment = getTestingEnvironment();

  cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards dib-credit-card')
    .should('contain', creditCard.visa.number.slice(-4))
    .should('contain', paymentMethod.primaryContact.firstName)
    .should('contain', paymentMethod.primaryContact.lastName)
    .should('contain', paymentMethod.primaryContact.email)
    .should('contain', creditCard.expiryMonth.slice(-1))
    .should('contain', creditCard.expiryYear);
  // TODO: This should be discussed, because on the staging environment, we don't have section "COMPANY INFORMATION"
  if (testingEnvironment === 'ci') {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards dib-credit-card')
      .should('contain', paymentMethod.companyInformation.vatNumber)
      .should('contain', paymentMethod.invoiceRecipient.email);
  }
};
