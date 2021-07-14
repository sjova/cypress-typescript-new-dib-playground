import { ReferenceFields } from '../../../models/company-settings/reference-fields';

describe('Company settings - Reference fields - Project', () => {
  let referenceDetails: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((reference) => {
      referenceDetails = reference;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/project');
  });

  it('should check "Display and set field to mandatory when checking out booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-project .checkbox-label')
      .contains('Display and set field to mandatory when checking out booking')
      .click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceDetails.projectConfirmationMessage);
  });

  //TODO: Check selector for input field
  it('should change project fields label at checkout', () => {
    cy.get('dib-company-management dib-reference-fields dib-project [ng-reflect-placeholder="Project"] input')
      .clear()
      .type(referenceDetails.projectLabel);
    cy.get('dib-company-management dib-reference-fields dib-project button')
      .contains(referenceDetails.changeLabelButton)
      .click();
    cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Change ').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceDetails.projectConfirmationMessage);
  });

  //TODO: Uncomment when bug is fixed
  // it('should reset to default fields label', () => {
  //   cy.get('dib-company-management dib-reference-fields  dib-project button').contains('Reset to default').click();
  // });

  it('should add a new project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project ui-button')
      .contains(referenceDetails.addProjectButton)
      .click();
    cy.get('.cdk-overlay-container dib-project-dialog [name="projectName"]').type(referenceDetails.projectName);
    cy.get('.cdk-overlay-container dib-project-dialog [name="description"]').type(referenceDetails.projectDescription);
    cy.get('.cdk-overlay-container dib-project-dialog ui-button button').contains('save').click();
    cy.get('dib-company-management dib-reference-fields dib-project').should('contain', referenceDetails.projectName);
  });

  it('should edit the project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project')
      .contains(referenceDetails.projectName)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains('edit')
      .click({ force: true });
    cy.get('.cdk-overlay-container dib-project-dialog [name="projectName"]')
      .clear()
      .type(referenceDetails.newProjectName);
    cy.get('.cdk-overlay-container dib-project-dialog ui-button button').contains('save').click();
    cy.get('dib-company-management dib-reference-fields dib-project .grid').should(
      'contain',
      referenceDetails.newProjectName
    );
  });

  it('should delete the project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project')
      .contains(referenceDetails.newProjectName)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains(' archive ')
      .click({ force: true });
    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceDetails.projectConfirmationMessage);
  });
});
