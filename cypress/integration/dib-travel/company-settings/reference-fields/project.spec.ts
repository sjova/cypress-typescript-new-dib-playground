import { Reference } from '../../../../models/company-settings/reference-fields';

describe('Company settings - Reference fields - Project', () => {
  let reference: Reference;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      reference = referenceFixture;
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

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', reference.projectConfirmationMessage);
  });

  it('should change project fields label at checkout', () => {
    cy.get('dib-company-management dib-reference-fields dib-project [ng-reflect-placeholder="Project"] input')
      .clear()
      .type(reference.projectLabel);

    cy.get('dib-company-management dib-reference-fields dib-project button')
      .contains(reference.changeLabelButton)
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Change ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', reference.projectConfirmationMessage);
  });

  // TODO: Uncomment when bug is fixed - DT8476
  // it('should reset to default fields label', () => {
  //   cy.get('dib-company-management dib-reference-fields  dib-project button').contains('Reset to default').click();
  // });

  it('should add a new project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project ui-button')
      .contains(reference.addProjectButton)
      .click();

    cy.get('.cdk-overlay-container dib-project-dialog [name="projectName"]').type(reference.projectName);
    cy.get('.cdk-overlay-container dib-project-dialog [name="description"]').type(reference.projectDescription);

    cy.get('.cdk-overlay-container dib-project-dialog ui-button button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-project').should('contain', reference.projectName);
  });

  it('should edit the project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project')
      .contains(reference.projectName)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-project-dialog [name="projectName"]').clear().type(reference.newProjectName);

    cy.get('.cdk-overlay-container dib-project-dialog ui-button button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-project .grid').should('contain', reference.newProjectName);
  });

  it('should delete the project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project')
      .contains(reference.newProjectName)
      .parent()
      .nextUntil('.table-cell .button-cell')
      .contains(' archive ')
      .clickAttached();

    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(reference.projectConfirmationMessage);

    cy.get('dib-company-management dib-reference-fields dib-project .grid').should(
      'not.contain',
      reference.newProjectName
    );
  });
});
