export const clickTooltip = (tooltipPosition: number): void => {
  cy.get('home dib-generic-product-form dib-tooltip')
    .eq(tooltipPosition)
    .invoke('show')
    .contains('info_outline')
    .trigger('mouseover', 'bottom')
    .click();
};
