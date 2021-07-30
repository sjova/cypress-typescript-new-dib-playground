import { ReferenceFields } from '../../../../models';

describe('Company Settings - Reference Fields - Project', () => {
  let referenceFields: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      referenceFields = referenceFixture;
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

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.project.confirmationMessage
    );
  });

  it('should change project fields label at checkout', () => {
    cy.get('dib-company-management dib-reference-fields dib-project label')
      .contains('Project')
      .next('input')
      .clear()
      .type(referenceFields.project.label);

    cy.get('dib-company-management dib-reference-fields dib-project ui-button')
      .contains(referenceFields.changeLabelCtaButton)
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' Change ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.project.confirmationMessage
    );
  });

  // TODO: Uncomment when the bug is fixed (DT-8476)
  /* it('should reset to default fields label', () => {
    cy.get('dib-company-management dib-reference-fields  dib-project ui-button').contains('Reset to default').click();
    // TODO: missing `.should()`
  }); */

  it('should add a new project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project ui-button')
      .contains(referenceFields.project.ctaButton)
      .click();

    cy.get('.cdk-overlay-container dib-project-dialog input[name="projectName"]').type(referenceFields.project.name);
    cy.get('.cdk-overlay-container dib-project-dialog input[name="description"]').type(
      referenceFields.project.description
    );
    cy.get('.cdk-overlay-container dib-project-dialog ui-button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-project').should('contain', referenceFields.project.name);
  });

  it('should edit the project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project .table-cell h4')
      .contains(referenceFields.project.name)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-project-dialog input[name="projectName"]')
      .clear()
      .type(referenceFields.project.modifiedName);
    cy.get('.cdk-overlay-container dib-project-dialog ui-button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-project .grid').should(
      'contain',
      referenceFields.project.modifiedName
    );
  });

  it('should delete the project', () => {
    cy.get('dib-company-management dib-reference-fields dib-project .table-cell h4')
      .contains(referenceFields.project.modifiedName)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains(' archive ')
      .clickAttached();

    cy.get('.cdk-overlay-container simple-snack-bar > span').contains(referenceFields.project.confirmationMessage);

    cy.get('dib-company-management dib-reference-fields dib-project .grid').should(
      'not.contain',
      referenceFields.project.modifiedName
    );
  });
});
