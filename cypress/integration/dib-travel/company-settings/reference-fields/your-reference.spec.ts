import { ReferenceFields } from '@cy/models';

describe('Company Settings - Reference Fields - Your Reference', () => {
  let referenceFields: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      referenceFields = referenceFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visitAngularUrl('/company-management/reference-fields/your-reference');
  });

  it('should change your reference fields label at checkout', () => {
    cy.get('dib-company-management dib-reference-fields dib-your-reference label')
      .contains('Your reference')
      .next('input')
      .clear()
      .type(referenceFields.yourReference.label);
    cy.get('dib-company-management dib-reference-fields dib-your-reference ui-button')
      .contains(referenceFields.changeLabelCtaButton)
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' Change ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.yourReference.confirmationMessage
    );
  });

  it('should reset Your reference field label to default', () => {
    cy.get('dib-company-management dib-reference-fields dib-your-reference ui-button[outline="true"]')
      .contains(referenceFields.resetToDefaultCtaButton)
      .click();
    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' Reset ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.yourReference.confirmationMessage
    );
  });

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-your-reference .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.yourReference.confirmationMessage2
    );
  });
});
