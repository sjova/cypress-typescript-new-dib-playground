import { clickCtaInsideSection } from 'integration/dib-travel/personal-settings/helpers';

/**
 * Change Account Currency
 *
 * @param {string} currency
 *
 * @example
 *    before(() => {
 *      cy.changeAccountCurrency(profileDetails.localize.currency);
 *    });
 */
export const changeAccountCurrency = (currency: string) => {
  cy.login();
  cy.visitAngularUrl('/profile/account');

  clickCtaInsideSection('Localize');

  cy.get('.cdk-overlay-container ui-form-dialog currency-picker').click().contains(currency).click();

  cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();
};
