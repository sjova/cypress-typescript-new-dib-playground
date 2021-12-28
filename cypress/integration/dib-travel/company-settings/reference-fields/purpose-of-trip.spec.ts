import { ReferenceFields } from '@cy/models';

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

  it('should change purpose of trip field label at checkout', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip label')
      .contains('Purpose of trip')
      .next('input')
      .clear()
      .type(referenceFields.purposeOfTrip.label);
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-button')
      .contains(referenceFields.changeLabelCtaButton)
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' Change ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.purposeOfTrip.confirmationMessage
    );
  });

  it('should reset Purpose of trip label fields to default', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-button[outline="true"]')
      .contains(referenceFields.resetToDefaultCtaButton)
      .click();
    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' Reset ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.purposeOfTrip.confirmationMessage
    );
  });

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.purposeOfTrip.confirmationMessage
    );
  });

  it('should submit empty form for adding new Purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-button[size="large"]')
      .contains(referenceFields.purposeOfTrip.addActionCtaButton)
      .click();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button').contains('Save').click();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog .input-holder .error').contains(
      ' Purpose of trip name is required.'
    );
  });

  it('should add a new purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-button[size="large"]')
      .contains(referenceFields.purposeOfTrip.addActionCtaButton)
      .click();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog input[name="purposeOfTripName"]').type(
      referenceFields.purposeOfTrip.name
    );
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog input[name="description"]').type(
      referenceFields.purposeOfTrip.description
    );
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button').contains('Save').click();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip').should(
      'contain',
      referenceFields.purposeOfTrip.name
    );
  });

  it('should search for previously added project', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip ui-input input')
      .eq(1)
      .type(referenceFields.purposeOfTrip.name);

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .table-cell:first').should(
      'have.text',
      referenceFields.purposeOfTrip.name
    );
  });

  it('should edit purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .table-cell h4')
      .contains(referenceFields.purposeOfTrip.name)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains('edit')
      .click();

    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog input[name="purposeOfTripName"]')
      .clear()
      .type(referenceFields.purposeOfTrip.modifiedName);
    cy.get('.cdk-overlay-container dib-purpose-of-trip-dialog ui-button').contains('Save').click();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .grid').should(
      'contain',
      referenceFields.purposeOfTrip.modifiedName
    );
  });

  it('should delete purpose of trip', () => {
    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .table-cell h4')
      .contains(referenceFields.purposeOfTrip.modifiedName)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains(' Archive ')
      .click();

    cy.get('dib-company-management dib-reference-fields dib-purpose-of-trip .grid').should(
      'not.contain',
      referenceFields.purposeOfTrip.modifiedName
    );

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.purposeOfTrip.confirmationMessage2
    );
  });
});
