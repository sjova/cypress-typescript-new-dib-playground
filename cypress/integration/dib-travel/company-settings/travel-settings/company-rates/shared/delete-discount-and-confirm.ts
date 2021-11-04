import { TravelSettings } from '@cy/models';

export const deleteDiscountAndConfirm = (companyRatesDetails: TravelSettings): void => {
  cy.waitForAngular();

  cy.get('dib-company-management dib-travel-settings dib-company-rates .grid')
    .first()
    .contains(companyRatesDetails.companyRates.modifiedDiscountName)
    .parents('dib-company-rates')
    .find('ui-button')
    .contains(' Delete ')
    .click();

  cy.get('.cdk-overlay-container confirmation-dialog-v2 ui-button[type=warning]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Company rate successfully deleted!');
};
