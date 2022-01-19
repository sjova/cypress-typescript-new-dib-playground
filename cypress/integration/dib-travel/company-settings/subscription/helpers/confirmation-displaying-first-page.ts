export const confirmFirstPagePreview = (date: string): void => {
  cy.get('dib-company-management dib-subscription dib-subscription-purchase-history p').should('contain', date);
};
