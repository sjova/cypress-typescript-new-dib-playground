import { ReferenceFields } from '../../../../models';

describe('Company Settings - Reference Fields - Your Reference', () => {
  let referenceFields: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      referenceFields = referenceFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/your-reference');
  });

  it('should change your reference fields label at checkout', () => {
    cy.get('dib-company-management dib-reference-fields dib-your-reference label')
      .contains('Your reference')
      .next('input')
      .clear()
      .type(referenceFields.yourReference.yourReferenceLabel);
    cy.get('dib-company-management dib-reference-fields dib-your-reference ui-button')
      .contains(referenceFields.changeLabel.changeLabelButton)
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' Change ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.yourReference.yourReferenceConfirmationMessage
    );
  });

  // TODO: Uncomment when the bug is fixed (DT-8476)
  /* it('should reset to default fields label', () => {
    cy.get('dib-company-management dib-reference-fields dib-your-reference').contains('Reset to default').click();
    // TODO: missing `.should()`
  }); */

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-your-reference .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.yourReference.yourReferenceConfirmationMessage
    );
  });
});
