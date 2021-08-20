// Reference:
// https://github.com/angular/angular/blob/master/packages/platform-browser/src/browser/testability.ts
// https://angular.io/api/core/Testability
// https://angular.io/guide/testing-components-scenarios
// https://medium.com/code-divoire/angular-testability-dealing-with-selenium-or-protractor-timeouts-84016fcec889
// https://dev.to/codedivoire/angular-testability-dealing-with-selenium-or-protractor-timeouts-479f
// https://gitmemory.com/issue/cypress-io/cypress/7306/649658924

export const waitForAngular = (subject?: JQuery<HTMLElement>): Cypress.Chainable<unknown> => {
  console.time('cy.waitForAngular() duration'); // start timer (will be removed later)
  cy.log('waitForAngular...');

  return cy
    .window({ log: true })
    .invoke('getAllAngularRootElements')
    .then((rootElements) => {
      const rootElement = rootElements[0];

      return cy
        .window({ log: true })
        .invoke('getAngularTestability', rootElement)
        .then(
          (testability) =>
            new Cypress.Promise((resolve) => {
              testability.whenStable(() => {
                console.timeEnd('cy.waitForAngular() duration'); // stops timer(will be removed later)
                subject ? resolve(subject) : resolve();
              });
            })
        );
    });
};

// Here is an example for manual testing in the browser console:
// console.time('Angular Is Ready');
// const rootElement = window.getAllAngularRootElements()[0];
// const testability = window.getAngularTestability(rootElement);
// testability.whenStable(() => console.timeEnd('Angular Is Ready'));
