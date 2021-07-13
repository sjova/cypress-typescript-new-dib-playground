import { ReferenceFields } from '../../../models/company-settings/reference-fields';

describe('Company settings - Reference fields - Purpose of trip', () => {
  let referenceDetails: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((reference) => {
      referenceDetails = reference;
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
      .type(referenceDetails.purposeOfTripLabel);
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip button')
      .contains(referenceDetails.changeLabelButton)
      .click();
    cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Change ').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(
      referenceDetails.purposeOfTripConfirmationMessage
    );
  });

  //TODO: Uncomment when bug is fixed
  // it('should reset to default fields label', () => {
  //   cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip').contains('Reset to default').click();
  // });

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(
      referenceDetails.purposeOfTripConfirmationMessage
    );
  });

  it('should add a new purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center ui-button')
      .contains(referenceDetails.addPurposeOfTripButton)
      .click();
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog [name="purposeOfTripName"]').type(
      referenceDetails.purposeOfTrip
    );
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog [name="description"]').type(
      referenceDetails.purposeOfTripDescription
    );
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button button').contains('save').click();
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip').should(
      'contain',
      referenceDetails.purposeOfTrip
    );
  });

  it('should edit purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip')
      .contains(referenceDetails.purposeOfTrip)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains('edit')
      .click({ force: true });
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog [name="purposeOfTripName"]')
      .clear()
      .type(referenceDetails.newPurposeOfTrip);
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button button').contains('save').click();
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .grid').should(
      'contain',
      referenceDetails.newPurposeOfTrip
    );
  });

  it('should delete purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip')
      .contains(referenceDetails.newPurposeOfTrip)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains(' archive ')
      .click({ force: true });
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(
      referenceDetails.purposeOfTripConfirmationMessage
    );
  });
});
