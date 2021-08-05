import {
  asyncAdd,
  checkToken,
  clickAttached,
  clickLink,
  dataCy,
  getIframeBody,
  getSessionStorage,
  iframeFix,
  login,
  loginAgent,
  setSessionStorage,
  switchToIframe,
  typeLogin,
  waitForAngular,
} from './commands';

Cypress.Commands.add('asyncAdd', asyncAdd);
Cypress.Commands.add('checkToken', checkToken);
Cypress.Commands.add('clickAttached', { prevSubject: 'element' }, clickAttached);
Cypress.Commands.add('clickLink', clickLink);
Cypress.Commands.add('dataCy', dataCy);
Cypress.Commands.add('getIframeBody', getIframeBody);
Cypress.Commands.add('getSessionStorage', getSessionStorage);
Cypress.Commands.add('iframeFix', iframeFix);
Cypress.Commands.add('login', login);
Cypress.Commands.add('loginAgent', loginAgent);
Cypress.Commands.add('setSessionStorage', setSessionStorage);
Cypress.Commands.add('switchToIframe', { prevSubject: 'element' }, switchToIframe);
Cypress.Commands.add('typeLogin', typeLogin);
Cypress.Commands.add('waitForAngular', { prevSubject: ['optional', 'element'] }, waitForAngular);
