import dibTravelAccounts from '@cy/fixtures/dib-travel-accounts.json';

describe('Cypress Accounts Fixture', () => {
  beforeEach(() => {
    cy.fixture('dib-travel-accounts.json').as('accounts');
  });

  it('confirms test context object structure and content', function () {
    expect(this.accounts, 'fixture in the test context').to.deep.equal(dibTravelAccounts);
  });

  it('loads a fixture and confirms that it is an object', () => {
    cy.fixture('dib-travel-accounts').then((accounts) => {
      expect(accounts).to.be.an('object');
    });
  });

  it('loads a fixture and confirms that the "agentAccount" exists', () => {
    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.agentAccount).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.agentAccount.email).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.agentAccount.password).to.exist;
    });
  });

  it('loads a fixture and confirms that the "defaultAccount" exists', () => {
    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.defaultAccount).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.defaultAccount.email).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.defaultAccount.password).to.exist;
    });
  });

  it('loads a fixture and confirms that the "defaultAccount.email" is equal to "qa.tools@dibtravel.com"', () => {
    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.defaultAccount.email).to.eq('qa.tools@dibtravel.com');
    });
  });

  it('loads a fixture and confirms that the "invalidAccount" exists', () => {
    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.invalidAccount).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.invalidAccount.email).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.invalidAccount.password).to.exist;
    });
  });

  it('loads a fixture and confirms that the "invalidAccount.email" is equal to "bot@dibtravel.com"', () => {
    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.invalidAccount.email).to.eq('bot@dibtravel.com');
    });
  });

  it('loads a fixture and confirms that the "signUpAccount" exists', () => {
    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.signUpAccount).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.signUpAccount.email).to.exist;
    });

    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.signUpAccount.password).to.exist;
    });
  });

  it('loads a fixture and confirms that the "signUpAccount.email" is equal to "qa.tools+cy.ci.sign-up.hash@dibtravel.com"', () => {
    cy.fixture('dib-travel-accounts').should((accounts) => {
      expect(accounts.signUpAccount.email).to.eq('qa.tools+cy.ci.sign-up.hash@dibtravel.com');
    });
  });
});
