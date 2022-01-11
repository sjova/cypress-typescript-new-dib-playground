export const visitAngularUrl = (url: string): void => {
  // TODO: Temp. workaround

  const urlSegments = url.split('/');
  const mainSegment = urlSegments[1];

  switch (mainSegment) {
    case 'my-travels':
      cy.get(`dib-navbar a[href="/${urlSegments[1]}"`).click;
      cy.get(`app-my-travels nav a[href="${url}"`).click();
      break;
    default:
      cy.get('dib-navbar dib-hamburger-icon').click();
      cy.get(`.cdk-overlay-container dib-navbar-panel a[href="${url}"]`).click();
      break;
  }
};

/*
Remains to cover:

cy.visit('/company-management/payment-method/billing-profiles');
// dib-company-management dib-payment-method dib-sub-tabs a
// Billing profiles
// Credit cards - not used?
// Lodge Cards - not used?

cy.visit('/company-management/reference-fields/cost-center');
// dib-company-management dib-reference-fields dib-sub-tabs a
// Cost center
// Project - not used?
// Purpose of trip - not used?
// Your reference - not used?

cy.visit('/company-management/subscription/licenses');
cy.visit('/company-management/subscription/overview');
cy.visit('/company-management/subscription/pricing-plans');
cy.visit('/company-management/subscription/payment-method');
cy.visit('/company-management/subscription/purchase-history');
// dib-company-management dib-subscription a
// Overview
// Pricing plans
// Licenses
// Payment method
// Purchase history

cy.visit('/company-management/payment-method/lodge-cards');
// dib-company-management dib-payment-method dib-sub-tabs a
// Billing profiles - not used?
// Credit cards - not used?
// Lodge Cards

cy.visit('/company-management/reference-fields/project');
cy.visit('/company-management/reference-fields/purpose-of-trip');
cy.visit('/company-management/reference-fields/your-reference');
// dib-company-management dib-reference-fields dib-page dib-sub-tabs a
// Cost center - not used?
// Project
// Purpose of trip
// Your reference

cy.visit('/company-management/travel-settings/company-rates');
// dib-company-management dib-travel-settings dib-sub-tabs a
// Travel policy - not used?
// Company Rates
*/
