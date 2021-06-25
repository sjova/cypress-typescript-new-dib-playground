describe('Cypress.config()', () => {
  it('Get and set configuration options', () => {
    // cy.visit('https://example.cypress.io/cypress-api');

    // https://on.cypress.io/config
    const myConfig = Cypress.config();

    expect(myConfig).to.have.property('animationDistanceThreshold', 5);
    // expect(myConfig).to.have.property('baseUrl', null);
    // expect(myConfig).to.have.property('baseUrl', 'https://example.cypress.io');
    expect(myConfig).to.have.property('baseUrl', 'https://develop--dib-travel.netlify.app/');
    expect(myConfig).to.have.property('defaultCommandTimeout', 4000);
    expect(myConfig).to.have.property('requestTimeout', 5000);
    expect(myConfig).to.have.property('responseTimeout', 30000);
    // expect(myConfig).to.have.property('viewportHeight', 660); // default
    expect(myConfig).to.have.property('viewportHeight', 720);
    // expect(myConfig).to.have.property('viewportWidth', 1000); // default
    expect(myConfig).to.have.property('viewportWidth', 1280);
    expect(myConfig).to.have.property('pageLoadTimeout', 60000);
    expect(myConfig).to.have.property('waitForAnimations', true);

    expect(Cypress.config('pageLoadTimeout')).to.eq(60000);

    // this will change the config for the rest of your tests!
    Cypress.config('pageLoadTimeout', 20000);

    expect(Cypress.config('pageLoadTimeout')).to.eq(20000);

    Cypress.config('pageLoadTimeout', 60000);

    // Custom
    Cypress.config('pluginsFile', 'cypress/plugins/index.ts');
    Cypress.config('supportFile', 'cypress/support/index.ts');
    Cypress.config('video', false);
  });
});
