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
    });

    it('should demonstrate conditional testing when an element exists', () => {
      cy.waitForAngular();

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
      cy.waitForAngular();

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

  /*
  describe('Element Existence Additional Example', () => {
    beforeEach(() => {
      cy.login();
      cy.visitAngularUrl('/people-management/groups');
    });

    it('should demonstrate conditional testing in the groups listing', () => {
      // Reference: https://docs.cypress.io/guides/core-concepts/conditional-testing#Element-existence

      // Please create this group manually to confirm conditional testing
      const testGroupName = 'Element Existence Demo Group';

      // `waitForAngular` must be used before conditional testing (otherwise, it will not work)
      cy.waitForAngular();

      // Start checking from parent feature `dib-people-management dib-groups`
      cy.get('dib-people-management dib-groups').then(($groups) => {
        // This was set only for demo purposes (you don't need to separate this in real test case)
        const contentWrapperSelector = 'dib-page .body .items';

        if ($groups.find(`${contentWrapperSelector} div[dib-empty-list-label]`).length) {
          cy.wrap($groups)
            .find(`${contentWrapperSelector} div[dib-empty-list-label]`)
            .contains('You have not yet created any groups.')
            .should('exist');
        } else {
          cy.wrap($groups)
            .find(`${contentWrapperSelector} dib-expandable-item .collapsed .item__main h2`)
            .contains(testGroupName)
            .should('exist');
        }
      });
    });
  });
  */
});
