import { ReferenceFields } from '../../../../models';

describe('Company Settings - Reference Fields - Cost Center', () => {
  let referenceFields: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      referenceFields = referenceFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/cost-center');
  });

  it('should both check-boxes be checked', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center ui-checkbox :checkbox')
      .uncheck({ force: true })
      .check({ force: true });

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.costCenter.costCenterConfirmationMessage
    );
  });

  it('should uncheck "Make cost centres visible to all employees" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centres visible to all employees')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.costCenter.costCenterConfirmationMessage
    );

    cy.get('dib-company-management dib-reference-fields dib-cost-center .warning-message')
      .should('be.visible')
      .contains(
        'If you uncheck this box, and have not assigned any cost center to an employee, they will not be able to complete their trip booking if cost centers are set as mandatory '
      );
  });

  // TODO: Uncomment when bug is fixed (DT-8477)
  /*it('should verify that error message is displayed', () => {
      cy.get('dib-company-management dib-reference-fields  dib-cost-center .warning-message')
      .should('not.be.visible')
      .contains(
        'If you uncheck this box, and have not assigned any cost center to an employee, they will not be able to complete their trip booking if cost centers are set as mandatory '
      );
    });*/

  it('should uncheck "Make cost centers mandatory in each travel booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centers mandatory in each travel booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.costCenter.costCenterConfirmationMessage
    );
  });

  // it('should check "Make cost centers mandatory in each travel booking" check-box', () => {
  //   cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
  //     .contains('Make cost centers mandatory in each travel booking')
  //     .click();

  //   cy.get('.cdk-overlay-container simple-snack-bar > span').should(
  //     'contain',
  //     referenceFields.costCenter.costCenterConfirmationMessage
  //   );
  // });

  // TODO: Revisit this, since in some cases watning message will not be visible

  it('should add new cost center', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center ui-button')
      .contains(referenceFields.costCenter.addCostCenterButton)
      .click();

    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Name*"]').type(
      referenceFields.costCenter.costCenterName
    );
    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Description"]').type(
      referenceFields.costCenter.costCenterDescription
    );

    cy.get('.cdk-overlay-container dib-cost-center-dialog dib-assign-members .members').contains('QA Bot').click();
    cy.get('.cdk-overlay-container dib-cost-center-dialog ui-button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-cost-center').should(
      'contain',
      referenceFields.costCenter.costCenterName
    );
  });

  it('should edit cost center', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell h4')
      .contains(referenceFields.costCenter.costCenterName)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Name*"]')
      .clear()
      .type(referenceFields.costCenter.newCostCenterName);
    cy.get('.cdk-overlay-container dib-cost-center-dialog ui-button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .grid').should(
      'contain',
      referenceFields.costCenter.newCostCenterName
    );
  });

  it('should delete cost center', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell h4')
      .contains(referenceFields.costCenter.newCostCenterName)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains(' archive ')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .grid').should(
      'not.contain',
      referenceFields.costCenter.newCostCenterName
    );
  });
});
