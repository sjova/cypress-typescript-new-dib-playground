export const visitAngularUrl = (url: string): void => {
  // TODO: This is a temp. workaround and will be revisited soon

  const urlSegments = url.split('/');
  const urlLastSegment = urlSegments[urlSegments.length - 1];
  const tabTitle = urlLastSegment.replace(/-/g, ' ');

  if (url.includes('/company-management/payment-method/')) {
    // feature section - tab navigation

    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel a[href="/company-management/payment-method"]').click();

    // TODO: Revisit this
    cy.waitForAngular();

    cy.get('dib-company-management dib-payment-method dib-sub-tabs .sub-tabs a')
      .contains(tabTitle, { matchCase: false })
      .click();
  } else if (url.includes('/company-management/reference-fields/')) {
    // feature section - tab navigation

    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel a[href="/company-management/reference-fields"]').click();

    // TODO: Revisit this
    cy.waitForAngular();

    cy.get('dib-company-management dib-reference-fields dib-sub-tabs .sub-tabs a')
      .contains(tabTitle, { matchCase: false })
      .click();
  } else if (url.includes('/company-management/subscription/')) {
    // feature section - tab navigation

    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel a[href="/company-management/subscription"]').click();

    // TODO: Revisit this
    cy.waitForAngular();

    cy.get('dib-company-management dib-subscription .sub-tabs a').contains(tabTitle, { matchCase: false }).click();
  } else if (url.includes('/company-management/travel-settings/')) {
    // feature section - tab navigation

    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel a[href="/company-management/travel-settings"]').click();

    // TODO: Revisit this
    cy.waitForAngular();

    cy.get('dib-company-management dib-travel-settings dib-sub-tabs .sub-tabs a')
      .contains(tabTitle, { matchCase: false })
      .click();
  } else if (url.includes('/my-travels/')) {
    // top header - link navigation

    cy.get('[data-cy="navbar-my-travels-link"]').click();

    // TODO: Revisit this
    cy.waitForAngular();

    cy.get(`app-my-travels nav a[href="${url}"`).click();
  } else {
    // right sidebar - main navigation

    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get(`.cdk-overlay-container dib-navbar-panel a[href="${url}"]`).click();
  }
};
