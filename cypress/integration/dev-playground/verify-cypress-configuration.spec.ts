describe('Cypress.config()', () => {
  it('should get and set configuration options', () => {
    const myConfig = Cypress.config();

    expect(myConfig).to.have.property('animationDistanceThreshold', 5);
    expect(myConfig).to.have.property('defaultCommandTimeout', 20000);
    expect(myConfig).to.have.property('requestTimeout', 18000);
    expect(myConfig).to.have.property('responseTimeout', 30000);
    expect(myConfig).to.have.property('pageLoadTimeout', 60000);

    // Specific to our project
    expect(myConfig).to.have.property('baseUrl', 'https://develop--dib-travel.netlify.app/');
    expect(Cypress.config('pluginsFile').toString().includes('cypress/plugins/index.ts')).to.be.true;
    expect(Cypress.config('supportFile').toString().includes('cypress/support/index.ts')).to.be.true;
    expect(myConfig).to.have.property('video', false);
    expect(myConfig).to.have.property('viewportHeight', 720);
    expect(myConfig).to.have.property('viewportWidth', 1280);
  });
});
