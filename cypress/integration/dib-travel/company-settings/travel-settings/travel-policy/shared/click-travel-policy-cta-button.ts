export const clickTravelPolicyCtaButton = (travelPolicyName: string, ctaButtonLabel: string): void => {
  // TODO: Revisit this line later, and maybe move in test `beforeEach` or test itself
  //cy.waitForAngular();

  cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title')
    .contains(travelPolicyName)
    .parents('dib-expandable-item')
    .find('ui-button')
    .contains(ctaButtonLabel)
    .click();
};
