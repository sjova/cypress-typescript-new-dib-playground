import { Reference } from '../../../../models/company-settings/reference-fields';

describe('Company settings - Reference fields - Purpose of trip', () => {
  let reference: Reference;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      reference = referenceFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/purpose-of-trip');
  });

  it('should change purpose of trip fields label at checkout', () => {
    cy.get(
      'dib-company-management dib-reference-fields dib-purpose-of-trip [ng-reflect-placeholder="Purpose of trip"] input'
    )
      .clear()
      .type(reference.purposeOfTripLabel);
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip button')
      .contains(reference.changeLabelButton)
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Change ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      reference.purposeOfTripConfirmationMessage
    );
  });

  // TODO: Uncomment when bug is fixed - DT8476
  // it('should reset to default fields label', () => {
  //   cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip').contains('Reset to default').click();
  // });

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      reference.purposeOfTripConfirmationMessage
    );
  });

  it('should add a new purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-button')
      .contains(reference.addPurposeOfTripButton)
      .click();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog [name="purposeOfTripName"]').type(
      reference.purposeOfTrip
    );
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog [name="description"]').type(
      reference.purposeOfTripDescription
    );

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip').should(
      'contain',
      reference.purposeOfTrip
    );
  });

  it('should edit purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip')
      .contains(reference.purposeOfTrip)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog [name="purposeOfTripName"]')
      .clear()
      .type(reference.newPurposeOfTrip);

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .grid').should(
      'contain',
      reference.newPurposeOfTrip
    );
  });

  it('should delete purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip')
      .contains(reference.newPurposeOfTrip)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains(' archive ')
      .clickAttached();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .grid').should(
      'not.contain',
      reference.newPurposeOfTrip
    );

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      reference.purposeOfTripConfirmationMessage
    );
  });
});
