export const clickBillingProfileCtaAction = (email: string, ctaButtonLabel: string): void => {
  cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .left .content .content')
    .contains(email)
    .parents('dib-item')
    .find('.right ui-button')
    .contains(ctaButtonLabel)
    .click();
};
