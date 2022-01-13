/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable mocha/no-top-level-hooks */

import {
  asyncAdd,
  checkToken,
  clickLink,
  dataCy,
  getSessionStorage,
  iframeFix,
  login,
  loginAgent,
  resetState,
  setSessionStorage,
  switchToIframe,
  typeLogin,
  visitAngularUrl,
  visitApp,
  waitForAngular,
} from './commands';

Cypress.Commands.add('asyncAdd', asyncAdd);
Cypress.Commands.add('checkToken', checkToken);
Cypress.Commands.add('clickLink', clickLink);
Cypress.Commands.add('dataCy', dataCy);
Cypress.Commands.add('getSessionStorage', getSessionStorage);
Cypress.Commands.add('iframeFix', iframeFix);
Cypress.Commands.add('login', login);
Cypress.Commands.add('loginAgent', loginAgent);
Cypress.Commands.add('resetState', resetState);
Cypress.Commands.add('setSessionStorage', setSessionStorage);
Cypress.Commands.add('switchToIframe', { prevSubject: 'element' }, switchToIframe);
Cypress.Commands.add('typeLogin', typeLogin);
Cypress.Commands.add('visitAngularUrl', visitAngularUrl);
Cypress.Commands.add('visitApp', visitApp);
Cypress.Commands.add('waitForAngular', { prevSubject: ['optional', 'element'] }, waitForAngular);

// Speedup Stripe analytics API calls
// Primarily used for iframe tests: `cypress/integration/dib-travel-iframe/*`
before(() => {
  cy.intercept('POST', 'https://r.stripe.com/0');
});

/* before(() => {
  cy.intercept('POST', 'https://r.stripe.com/0', {
    statusCode: 200,
    body: '',
    headers: {
      Server: 'nginx',
      Date: new Date().toUTCString(),
      'Content-Length': '0',
      Connection: 'keep-alive',
      'access-control-allow-origin': 'https://js.stripe.com',
      'access-control-allow-credentials': 'true',
      'Content-Type': 'text/plain',
    },
  });
});
 */
