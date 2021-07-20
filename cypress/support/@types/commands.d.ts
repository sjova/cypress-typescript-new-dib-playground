import { User } from '../../models';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * @todo Used for Cypress demo purposes and must be revisited before usage
       *
       * Adds two numbers asynchronously
       *
       * @param {number} a
       * @param {number} b
       * @example
       *    cy.asyncAdd(2, 3).should('equal', 5)
       */
      asyncAdd(a: number, b: number): void;

      /**
       * @todo Used for Cypress demo purposes and must be revisited before usage
       *
       * Check token in Local Storage
       *
       * @param {string} token - Token name
       * @example
       *    cy.checkToken('abc123')
       */
      checkToken(token: string): void;

      /**
       * @todo Revisit usage of this later
       *
       * Click attached DOM element
       *
       * @example
       *    cy.get('button').clickAttached()
       *    cy.focused().clickAttached()
       *    cy.contains('Welcome').clickAttached()
       */

      clickAttached(): Cypress.Chainable<JQuery<HTMLElement>>;

      /**
       * @todo Used for Cypress demo purposes and must be revisited before usage
       *
       * Click on a link with a specific label
       *
       * @param {string} label - Link label
       * @example
       *    cy.clickLink('Buy Now')
       */
      clickLink(label: string): Cypress.Chainable<JQuery<HTMLAnchorElement>>;

      /**
       * Select DOM element by data-cy attribute
       *
       * @param {string} value - Attribute value
       * @example
       *    cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * @todo Used for Cypress demo purposes and must be revisited before usage
       *
       * Get Session Storage - Returns the current value associated with the given key,
       * or null if the given key does not exist in the list associated with the object.
       *
       * @param {string} key - Key name
       * @example
       *    cy.getSessionStorage('abc123')
       */
      getSessionStorage(key: string): void;

      /**
       * Login user on DIB Travel platform.
       * Default DIB Travel account will be used if email and password are not provided.
       *
       * @param {string} email - User email
       * @param {string} password - User password
       * @example
       *    cy.login();
       *    cy.login('petar.petrovic@dibtravel.com', 'Secret1')
       */
      login(email?: string, password?: string): void;

      /**
       * Login agent on DIB Travel platform.
       * Default DIB Travel account will be used if email and password are not provided.
       *
       * @param {string} userEmail - User email
       * @param {string} agentEmail - Agent email
       * @param {string} agentPassword - Agent password
       * @example
       *    cy.loginAgent();
       *    cy.loginAgent('petar.petrovic@dibtravel.com', 'milan.milanovic@dibtravel.com', 'Secret1')
       */
      loginAgent(userEmail?: string, agentEmail?: string, agentPassword?: string): void;

      /**
       * @todo Used for Cypress demo purposes and must be revisited before usage
       *
       * Set Session Storage - Sets the value of the pair identified by key to value,
       * creating a new key/value pair if none existed for key previously.
       *
       * @param {string} key - Key name
       * @example
       *    cy.setSessionStorage('abc123')
       */
      setSessionStorage(key: string): void;

      /**
       * @todo Used for Cypress demo purposes and must be revisited before usage
       *
       * Login user with specified email and password
       *
       * @param {User} user - User object
       * @example
       *    cy.typeLogin({ email: 'petar.petrovic@dibtravel.com', password: 'Secret1' })
       */
      typeLogin(user: User): void;
    }
  }
}
