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
} from 'support/commands';

declare global {
  namespace Cypress {
    interface Chainable {
      asyncAdd: typeof asyncAdd;
      checkToken: typeof checkToken;
      clickLink: typeof clickLink;
      dataCy: typeof dataCy;
      getSessionStorage: typeof getSessionStorage;
      iframeFix: typeof iframeFix;
      login: typeof login;
      loginAgent: typeof loginAgent;
      resetState: typeof resetState;
      setSessionStorage: typeof setSessionStorage;
      switchToIframe: typeof switchToIframe;
      typeLogin: typeof typeLogin;
      visitAngularUrl: typeof visitAngularUrl;
      visitApp: typeof visitApp;
      waitForAngular: typeof waitForAngular;
    }
  }
}
