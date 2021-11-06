import { getFirstWord } from '@cy/helpers';
import { PaymentMethod } from '@cy/models';

export const addBillingProfile = (paymentMethod: PaymentMethod): void => {
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=legalName]').type(
    paymentMethod.companyInformation.companyLegalName
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=taxId]').type(
    paymentMethod.companyInformation.taxId
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=city]').type(
    paymentMethod.companyInformation.city
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
    .first()
    .select(paymentMethod.companyInformation.country);
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=streetName]').type(
    paymentMethod.companyInformation.address
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=zipcode]').type(
    paymentMethod.companyInformation.zipCode
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactFirstName]').type(
    paymentMethod.primaryContact.firstName
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactLastName]').type(
    paymentMethod.primaryContact.lastName
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactEmail]').type(
    paymentMethod.primaryContact.email
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=invoiceRecipientEmail]').type(
    paymentMethod.invoiceRecipient.email
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=vatNumber]').type(
    paymentMethod.invoiceRecipient.vatNumber
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
    .last()
    .select(paymentMethod.currency.originalCurrency);
  cy.get('.cdk-overlay-container dib-billing-profile-dialog input[placeholder=Search]').type(
    getFirstWord(paymentMethod.groupName)
  );
  cy.get('.cdk-overlay-container dib-billing-profile-dialog .members .group').click();

  cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully added billing profile.');
};
