export const archiveBillingProfile = (email: string): void => {
  cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item')
    .contains(email)
    .parents('dib-item')
    .find('ui-button')
    .contains('archive')
    .clickAttached();
};
