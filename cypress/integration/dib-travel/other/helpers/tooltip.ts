export const tooltip = (arg: number): void => {
  cy.get('home dib-generic-product-form dib-tooltip')
    .eq(arg)
    .invoke('show')
    .contains('info_outline')
    .trigger('mouseover', 'bottom')
    .click();
};
