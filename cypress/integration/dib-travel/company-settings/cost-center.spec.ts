import { ReferenceFields } from '../../../models/company-settings/reference-fields';

describe('Company settings - Reference fields - Cost center', () => {
  let referenceDetails: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((reference) => {
      referenceDetails = reference;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/cost-center');
  });

  it('should "Reference Fields" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Reference Fields');
  });

  it('should check "Make cost centres visible to all employees" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centres visible to all employees')
      .click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceDetails.costCenterConfirmationMessage);
  });

  it('should check "Make cost centers mandatory in each travel booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centers mandatory in each travel booking')
      .click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceDetails.costCenterConfirmationMessage);
  });

  it('should uncheck "Make cost centres visible to all employees" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centres visible to all employees')
      .click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceDetails.costCenterConfirmationMessage);
    cy.get('dib-company-management dib-reference-fields dib-cost-center .warning-message')
      .should('be.visible')
      .contains(
        'If you uncheck this box, and have not assigned any cost center to an employee, they will not be able to complete their trip booking if cost centers are set as mandatory '
      );
  });

  it('should uncheck "Make cost centers mandatory in each travel booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centers mandatory in each travel booking')
      .click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceDetails.costCenterConfirmationMessage);
    //TODO: Uncomment when bug is fixed
    // cy.get('dib-company-management dib-reference-fields  dib-cost-center .warning-message')
    //   .should('not.be.visible')
    //   .contains(
    //     'If you uncheck this box, and have not assigned any cost center to an employee, they will not be able to complete their trip booking if cost centers are set as mandatory '
    //   );
  });

  //TODO: Check selector for .mat-checkbox (.contains is solution?)
  it('should add new cost center', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center ui-button')
      .contains(referenceDetails.addCostCenterButton)
      .click();
    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Name*"]').type(
      referenceDetails.costCenterName
    );
    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Description"]').type(
      referenceDetails.costCenterDescription
    );
    cy.get('.cdk-overlay-container dib-cost-center-dialog dib-assign-members .members .mat-checkbox-layout')
      .contains('QA Bot')
      .click();
    cy.get('.cdk-overlay-container dib-cost-center-dialog ui-button button').contains('save').click();
    cy.get('dib-company-management dib-reference-fields dib-cost-center').should(
      'contain',
      referenceDetails.costCenterName
    );
  });

  it('should edit cost center', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center')
      .contains(referenceDetails.costCenterName)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains('edit')
      .click({ force: true });
    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Name*"]')
      .clear()
      .type(referenceDetails.newCostCenterName);
    cy.get('.cdk-overlay-container dib-cost-center-dialog ui-button button').contains('save').click();
    cy.get('dib-company-management dib-reference-fields dib-cost-center .grid').should(
      'contain',
      referenceDetails.newCostCenterName
    );
  });

  it('should delete cost center', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center')
      .contains(referenceDetails.newCostCenterName)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains(' archive ')
      .click({ force: true });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();
  });
});
