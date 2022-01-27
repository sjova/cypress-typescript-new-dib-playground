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
import dibTravelAccounts from '@cy/fixtures/dib-travel-accounts.json';

export const login = (
  email = dibTravelAccounts.defaultAccount.email,
  password = dibTravelAccounts.defaultAccount.password
): void => {
  cy.visitApp('/login');

  cy.get('new-login ui-input[type=email] input[name="email"]').type(email);
  cy.get('new-login ui-input[name=password] input[name="password"]').type(password);

  cy.get('new-login ui-button button').contains('Sign in').click();

  cy.waitForAngular();

  cy.get('cookies-popup .cookies-popup .close-icon').click();
};

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
export const loginAgent = (
  userEmail = dibTravelAccounts.defaultAccount.email,
  agentEmail = dibTravelAccounts.agentAccount.email,
  agentPassword = dibTravelAccounts.agentAccount.password
): void => {
  cy.visitApp('/login/agent');

  cy.get('new-agent-login ui-input[type=email] input[name=userEmail]').type(userEmail);
  cy.get('new-agent-login ui-input[type=email] input[name=email]').type(agentEmail);
  cy.get('new-agent-login ui-input[name=password] input[name="password"]').type(agentPassword);

  cy.get('new-agent-login ui-button button').contains('Login').click();

  cy.waitForAngular();

  cy.get('cookies-popup .cookies-popup .close-icon').click();
};
