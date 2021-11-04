import { TravelSettings } from '@cy/models';

export const editDiscount = (companyRatesDetails: TravelSettings): void => {
  cy.get('dib-company-management dib-travel-settings dib-company-rates .grid')
    .first()
    .contains(companyRatesDetails.companyRates.discountName)
    .parents('dib-company-rates')
    .find('ui-button')
    .contains(' edit ')
    .click();
};
