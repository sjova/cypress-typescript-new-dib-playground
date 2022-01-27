import { User } from '@cy/models';

/**
 * @todo Used for Cypress demo purposes and must be revisited before usage
 *
 * Login user with specified email and password
 *
 * @param {User} user - User object
 * @example
 *    cy.typeLogin({ email: 'petar.petrovic@dibtravel.com', password: 'Secret1' })
 */
export const typeLogin = (user: Pick<User, 'email' | 'password'>): void => {
  cy.get('input[name=email]').type(user.email);
  cy.get('input[name=password]').type(user.password);
};
