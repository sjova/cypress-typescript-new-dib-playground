export const archiveLodgeCard = (email: string): void => {
  cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item')
    .contains(email)
    .parents('dib-item')
    .find('ui-button')
    .contains(' archive ')
    .clickAttached();
};
