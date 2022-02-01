import { TravelSettings } from '@cy/models';

export const deleteDiscountAndConfirm = (companyRatesDetails: TravelSettings): void => {
  cy.get('dib-company-management dib-travel-settings dib-company-rates dib-page .grid .table-cell h4')
    .contains(companyRatesDetails.companyRates.modifiedDiscountName)
    .parent('.table-cell')
    .next('.table-cell')
    .next('.table-cell')
    .next('.button-cell')
    .find('ui-button')
    .contains(' Delete ')
    .click();

  cy.get('.cdk-overlay-container confirmation-dialog-v2 ui-button[type=warning]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Company rate successfully deleted!');
};
