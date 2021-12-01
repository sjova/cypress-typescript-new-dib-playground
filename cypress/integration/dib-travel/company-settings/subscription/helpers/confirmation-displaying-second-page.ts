export const confirmSecondPagePreview = (): void => {
  cy.get('dib-company-management dib-subscription dib-subscription-purchase-history p').should(
    'contain',
    ' Nov 18, 2021 '
  );
};
