import { ReferenceFields } from '../../../models/company-settings/reference-fields';

describe('Company settings - Reference fields - Your reference', () => {
  let referenceDetails: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((reference) => {
      referenceDetails = reference;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/your-reference');
  });

  it('should change your reference fields label at checkout', () => {
    cy.get(
      'dib-company-management dib-reference-fields dib-your-reference [ng-reflect-placeholder="Your reference"] input'
    )
      .clear()
      .type(referenceDetails.yourReferenceLabel);
    cy.get('dib-company-management dib-reference-fields dib-your-reference button')
      .contains(referenceDetails.changeLabelButton)
      .click();
    cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Change ').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(
      referenceDetails.yourReferenceConfirmationMessage
    );
  });

  ///TODO: Uncomment when bug is fixed
  // it('should reset to default fields label', () => {
  //   cy.get('dib-company-management dib-reference-fields dib-your-reference').contains('Reset to default').click();
  // });

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-your-reference .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(
      referenceDetails.yourReferenceConfirmationMessage
    );
  });
});
