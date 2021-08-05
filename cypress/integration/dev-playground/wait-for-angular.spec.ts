describe('Wait For Angular Until It Becomes Ready', () => {
  describe('Simple Querying', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('should demonstrate the usage of "waitForAngular" and "get" commands', () => {
      cy.waitForAngular();
      cy.get('new-login .auth-container ui-button button').should('contain', 'Sign in');
    });

    it('should demonstrate the usage of "get", "waitForAngular", and "find" commands', () => {
      cy.get('new-login .auth-container').waitForAngular().find('ui-button button').should('contain', 'Sign in');
    });

    it('should demonstrate the usage of "get", "waitForAngular", and "within" commands', () => {
      cy.get('new-login .auth-container')
        .waitForAngular()
        .within(() => {
          cy.get('ui-button button').should('contain', 'Sign in');
        });
    });
  });

  describe('Element Existence', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.waitForAngular();
    });

    it('should demonstrate conditional testing when an element exists', () => {
      cy.get('new-login').then(($newLogin) => {
        const primaryButton = $newLogin.find('ui-button[type="primary"] button');

        if (primaryButton.length) {
          cy.wrap(primaryButton).should('exist');
          cy.wrap(primaryButton).should('contain', 'Sign in');
        } else {
          cy.get('new-login .auth-container ui-button[type="primary"] button').should('not.exist');
        }
      });
    });

    it('should demonstrate conditional testing when an element not exists', () => {
      cy.get('new-login').then(($newLogin) => {
        const secondaryButton = $newLogin.find('ui-button[type="secondary"] button');

        if (secondaryButton.length) {
          cy.wrap(secondaryButton).should('exist');
          cy.wrap(secondaryButton).should('contain', 'Foo');
        } else {
          cy.get('new-login .auth-container ui-button[type="secondary"] button').should('not.exist');
        }
      });
    });
  });
});
