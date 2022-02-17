import { getFirstWord, getTestingEnvironment } from '@cy/helpers';
import { PaymentMethod } from '@cy/models';

let testingEnvironment: string;

export const addBillingProfile = (paymentMethod: PaymentMethod): void => {
  testingEnvironment = getTestingEnvironment();

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

  // TODO: This should be discussed, because on the staging environment, we don't have section "INVOICE RECIPIENT E-MAIL AND VAT NUMBER"
  if (testingEnvironment === 'ci') {
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethod.invoiceRecipient.email
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=vatNumber]').type(
      paymentMethod.invoiceRecipient.vatNumber
    );
  }

  // TODO: Find a group by "Currency" string, and then find input.
  cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
    .last()
    .select(paymentMethod.currency.originalCurrency);

  cy.get('.cdk-overlay-container dib-billing-profile-dialog  ui-control-wrapper .container').click();
  cy.get('.cdk-overlay-container dib-billing-profile-dialog  ui-control-wrapper .container').type(
    getFirstWord(paymentMethod.groupName)
  );
  // Computed size is zero, and we need to use `{ force: true }`
  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label')
    .contains(paymentMethod.groupName)
    .click({ force: true });

  cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Successfully added billing profile.');
};
