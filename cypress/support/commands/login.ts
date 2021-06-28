import dibTravelAccounts from '../../fixtures/dib-travel-accounts.json';

export const login = (
  email = dibTravelAccounts.defaultAccount.email,
  password = dibTravelAccounts.defaultAccount.password
): void => {
  cy.visit('/login');

  cy.get('new-login ui-input[type=email] input[name="email"]').type(email);
  cy.get('new-login ui-input[name=password] input[name="password"]').type(password);

  cy.get('new-login ui-button button').contains('Sign in').click();

  cy.get('cookies-popup .cookies-popup__content .close-icon').click();
};

export const loginAgent = (
  userEmail = dibTravelAccounts.defaultAccount.email,
  agentEmail = dibTravelAccounts.agentAccount.email,
  agentPassword = dibTravelAccounts.agentAccount.password
): void => {
  cy.visit('login/agent');

  cy.get('new-agent-login ui-input[type=email] input[name=userEmail]').type(userEmail);
  cy.get('new-agent-login ui-input[type=email] input[name=email]').type(agentEmail);
  cy.get('new-agent-login ui-input[name=password] input[name="password"]').type(agentPassword);

  cy.get('new-agent-login ui-button button').contains('Login').click();

  cy.get('cookies-popup .cookies-popup__content .close-icon').click();
};
