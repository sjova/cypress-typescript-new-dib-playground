describe('Company Settings - Invoice Settings (Agent)', () => {
  beforeEach(() => {
    cy.loginAgent();
    cy.visitAngularUrl('/company-management/invoice-settings');
  });

  it('should display "Invoice Settings" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', ' Invoice Settings ');
  });

  it('should check if "Invoice Settings" is displayed in header and verify that content is valid', () => {
    cy.get('dib-company-management dib-invoice-settings .header h1').contains(' Invoice Settings ');
    cy.get('dib-company-management dib-invoice-settings .header .content').should(
      'have.text',
      'This feature is only visible to you as a Travel agent. Here you will find customer settings that are important to connect self service portal with your Mid/Backoffice tool.'
    );
  });

  it('should all check-boxes be un-checked and input fields disabled', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-invoice-settings ui-checkbox input[type="checkbox"]')
      // Computed size is zero, and we need to use `{ force: true }`
      .check({ force: true })
      .uncheck({ force: true });

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Save changes ').click();

    cy.get('.cdk-overlay-container confirmation-dialog span').should(
      'have.text',
      'All changes need to be verified with Mid/Backoffice settings or this can result in data inconsistency. Are you sure you want to save these changes?'
    );

    cy.get('.cdk-overlay-container confirmation-dialog .button').contains(' Save ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully saved!');

    cy.get('dib-company-management dib-invoice-settings ui-input ui-control-wrapper').should(
      'have.attr',
      'class',
      'focused disabled'
    );
  });

  it('should check Lodgecard payment method', () => {
    cy.get('dib-company-management dib-invoice-settings ui-checkbox  .checkbox-label')
      .contains('Lodgecard (Travel account)')
      .click();

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Save changes ').click();
    cy.get('.cdk-overlay-container confirmation-dialog .button').contains(' Save ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully saved!');
  });

  it('should check Travel agency billing payment method', () => {
    cy.get('dib-company-management dib-invoice-settings ui-checkbox  .checkbox-label')
      .contains('Travel agency billing')
      .click();

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Save changes ').click();
    cy.get('.cdk-overlay-container confirmation-dialog .button').contains(' Save ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully saved!');
  });

  it('should check Credit cards payment method', () => {
    cy.get('dib-company-management dib-invoice-settings ui-checkbox  .checkbox-label')
      .contains('Credit cards (Individual cards)')
      .click();

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Save changes ').click();
    cy.get('.cdk-overlay-container confirmation-dialog .button').contains(' Save ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully saved!');
  });

  it('should check Cancel changes button', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-invoice-settings ui-checkbox input[type="checkbox"]')
      // Computed size is zero, and we need to use `{ force: true }`
      .uncheck({ force: true })
      .check({ force: true });

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Cancel changes ').click();

    cy.get('dib-company-management dib-invoice-settings ui-input ui-control-wrapper').should(
      'have.attr',
      'class',
      'focused disabled'
    );
  });

  it('should click cancel button after all check-boxes be checked and input fields should be disabled', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-invoice-settings ui-checkbox input[type="checkbox"]')
      // Computed size is zero, and we need to use `{ force: true }`
      .uncheck({ force: true })
      .check({ force: true });

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Save changes ').click();

    cy.get('.cdk-overlay-container confirmation-dialog span').should(
      'have.text',
      'All changes need to be verified with Mid/Backoffice settings or this can result in data inconsistency. Are you sure you want to save these changes?'
    );

    cy.get('.cdk-overlay-container confirmation-dialog .button').contains(' Cancel ').click();

    cy.reload();

    cy.get('dib-company-management dib-invoice-settings ui-input ui-control-wrapper').should(
      'have.attr',
      'class',
      'focused disabled'
    );
  });

  it('should all check-boxes be checked and input fields enabled', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-invoice-settings ui-checkbox input[type="checkbox"]')
      // Computed size is zero, and we need to use `{ force: true }`
      .uncheck({ force: true })
      .check({ force: true });

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Save changes ').click();

    cy.get('.cdk-overlay-container confirmation-dialog span').should(
      'have.text',
      'All changes need to be verified with Mid/Backoffice settings or this can result in data inconsistency. Are you sure you want to save these changes?'
    );

    cy.get('.cdk-overlay-container confirmation-dialog .button').contains(' Save ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully saved!');

    cy.get('dib-company-management dib-invoice-settings ui-input ui-control-wrapper').should(
      'have.attr',
      'class',
      'focused'
    );
  });

  // TODO: Uncomment when bug (DT-10506) is fixed
  /* it('should check Reset to Default button', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-invoice-settings ui-button').contains(' Reset To Default ').click();

    cy.get('.cdk-overlay-container confirmation-dialog span').should(
      'have.text',
      'Are you sure you want to make these changes?'
    );

    cy.get('.cdk-overlay-container confirmation-dialog .button').contains(' Save ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully saved!');
  }); */
});
