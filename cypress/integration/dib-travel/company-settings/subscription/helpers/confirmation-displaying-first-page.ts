export const confirmFirstPagePreview = (): void => {
  cy.get('dib-company-management dib-subscription dib-subscription-purchase-history p').should(
    'contain',
    ' Apr 2, 2021 '
  );
};
