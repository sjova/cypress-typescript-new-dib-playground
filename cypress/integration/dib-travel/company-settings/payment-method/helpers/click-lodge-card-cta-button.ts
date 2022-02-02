export const clickLodgeCardCtaButton = (email: string, ctaButtonLabel: string): void => {
  cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item .left .content .content')
    .contains(email)
    .parents('dib-item')
    .find('.right ui-button')
    .contains(ctaButtonLabel)
    .click();
};
