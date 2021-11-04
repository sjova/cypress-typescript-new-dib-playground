import { TravelSettings } from '@cy/models';

export const AddNewDiscount = (companyRatesDetails: TravelSettings): void => {
  cy.get('dib-company-management dib-travel-settings dib-company-rates ui-button[type=primary]').click();

  cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Next ').click();

  cy.get('.cdk-overlay-container dib-company-rates-dialog input[name=discountName').type(
    companyRatesDetails.companyRates.discountName
  );
  cy.get('.cdk-overlay-container dib-company-rates-dialog input[name=discountCode').type(
    companyRatesDetails.companyRates.discountCode
  );
};
