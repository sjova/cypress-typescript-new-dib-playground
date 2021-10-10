import { User } from '@cy/models';

export const typeLogin = (user: Pick<User, 'email' | 'password'>): void => {
  cy.get('input[name=email]').type(user.email);
  cy.get('input[name=password]').type(user.password);
};
