import {
  asyncAdd,
  checkToken,
  clickLink,
  dataCy,
  getSessionStorage,
  login,
  loginAgent,
  setSessionStorage,
  typeLogin,
} from './commands';

Cypress.Commands.add('asyncAdd', asyncAdd);
Cypress.Commands.add('checkToken', checkToken);
Cypress.Commands.add('clickLink', clickLink);
Cypress.Commands.add('dataCy', dataCy);
Cypress.Commands.add('getSessionStorage', getSessionStorage);
Cypress.Commands.add('login', login);
Cypress.Commands.add('loginAgent', loginAgent);
Cypress.Commands.add('setSessionStorage', setSessionStorage);
Cypress.Commands.add('typeLogin', typeLogin);
