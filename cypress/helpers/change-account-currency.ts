import { clickCtaInsideSection } from 'integration/dib-travel/personal-settings/helpers';

export const changeAccountCurrency = (profileDetails: string) => {
  cy.login();
  cy.visitAngularUrl('/profile/account');

  clickCtaInsideSection('Localize');

  cy.get('.cdk-overlay-container ui-form-dialog currency-picker').click().contains(profileDetails).click();

  cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();
};
