import { ReferenceFields } from '../../../../models';

describe('Company Settings - Reference Fields - Purpose Of Trip', () => {
  let referenceFields: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      referenceFields = referenceFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/purpose-of-trip');
  });

  it('should change purpose of trip fields label at checkout', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip label')
      .contains('Purpose of trip')
      .next('input')
      .clear()
      .type(referenceFields.purposeOfTrip.purposeOfTripLabel);
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-button')
      .contains(referenceFields.changeLabel.changeLabelButton)
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' Change ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.purposeOfTrip.purposeOfTripConfirmationMessage
    );
  });

  // TODO: Uncomment when the bug is fixed (DT-8476)
  /* it('should reset to default fields label', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip').contains('Reset to default').click();
    // TODO: missing `.should()`
  }); */

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.purposeOfTrip.purposeOfTripConfirmationMessage
    );
  });

  it('should add a new purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-button')
      .contains(referenceFields.purposeOfTrip.addPurposeOfTripButton)
      .click();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog input[name="purposeOfTripName"]').type(
      referenceFields.purposeOfTrip.purposeOfTripText
    );
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog input[name="description"]').type(
      referenceFields.purposeOfTrip.purposeOfTripDescription
    );
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip').should(
      'contain',
      referenceFields.purposeOfTrip.purposeOfTripText
    );
  });

  it('should edit purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .table-cell h4')
      .contains(referenceFields.purposeOfTrip.purposeOfTripText)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog input[name="purposeOfTripName"]')
      .clear()
      .type(referenceFields.purposeOfTrip.newPurposeOfTrip);
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .grid').should(
      'contain',
      referenceFields.purposeOfTrip.newPurposeOfTrip
    );
  });

  it('should delete purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .table-cell h4')
      .contains(referenceFields.purposeOfTrip.newPurposeOfTrip)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains(' archive ')
      .clickAttached();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .grid').should(
      'not.contain',
      referenceFields.purposeOfTrip.newPurposeOfTrip
    );

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.purposeOfTrip.purposeOfTripConfirmationMessage
    );
  });
});
