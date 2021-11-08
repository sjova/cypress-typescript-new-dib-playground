import { CreditCard, PaymentMethod } from '@cy/models';

export const confirmAddedCreditCard = (paymentMethod: PaymentMethod, creditCard: CreditCard): void => {
  cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards dib-credit-card')
    .should('contain', creditCard.visa.number.slice(-4))
    .should('contain', paymentMethod.primaryContact.firstName)
    .should('contain', paymentMethod.primaryContact.lastName)
    .should('contain', paymentMethod.primaryContact.email)
    .should('contain', creditCard.expiryMonth.slice(-1))
    .should('contain', creditCard.expiryYear)
    .should('contain', paymentMethod.companyInformation.vatNumber)
    .should('contain', paymentMethod.invoiceRecipient.email);
};
