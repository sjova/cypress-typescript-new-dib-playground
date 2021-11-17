import { TravelSettings } from '@cy/models';

export const confirmAddedDiscount = (companyRatesDetails: TravelSettings): void => {
  cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Add ').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Company rate successfully saved!');
  cy.get('dib-company-management dib-travel-settings dib-company-rates h4')
    .should('contain', companyRatesDetails.companyRates.discountName)
    .should('contain', 'Active');

  // TODO: We should test the case when "Active discount" is toggled off
};
