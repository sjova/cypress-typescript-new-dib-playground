import { TravelSettings } from '@cy/models';

export const editDiscount = (companyRatesDetails: TravelSettings): void => {
  cy.get('dib-company-management dib-travel-settings dib-company-rates dib-page .grid .table-cell h4')
    .contains(companyRatesDetails.companyRates.discountName)
    .parent('.table-cell')
    .next('.table-cell')
    .next('.table-cell')
    .next('.button-cell')
    .find('ui-button')
    .contains(' edit ')
    .click();
};
