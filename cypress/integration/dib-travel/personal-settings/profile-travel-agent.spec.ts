import { ProfileDetails } from '../../../models';
import { deleteEmployee } from '../../../support/commands/add-delete-employee';
import { addNewEmployee } from '../company-employees';

describe('Personal Settings - Profile - Travel agent', () => {
  let profileDetails: ProfileDetails;

  before(() => {
    cy.fixture('personal-settings/profile-details').then((profileDetailsFixture) => {
      profileDetails = profileDetailsFixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  // TODO: Add missing user via shared fn
  // Please use following structure for shared group
  // dib-travel/<feature-name>/shared/<shared-group-of-commands>.ts - please be descriptive
  // dib-travel/<feature-name>/index.ts - please export shared test command

  it('should add Internal travel agent', () => {
    cy.visit('/people-management/employees');
    addNewEmployee();
    cy.visit('/profile/account');

    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');
    cy.intercept('POST', '/api/secure/v1/customers/*/internal-travel-agents').as('postInternalTravelAgents');

    cy.wait('@getEmployees');

    // Fix custom delay in implementation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('dib-profile dib-account dib-internal-agents ui-button').contains('Add').click();

    cy.get('.cdk-overlay-container dib-internal-agents-dialog dib-assign-members .member .user')
      .contains(profileDetails.internalTravelAgent.employee)
      .click();
    cy.get('.cdk-overlay-container dib-internal-agents-dialog ui-button').contains('Add').click();

    cy.wait('@postInternalTravelAgents');

    cy.get('dib-profile dib-account dib-internal-agents .--first').should(
      'contain',
      profileDetails.internalTravelAgent.employee
    );
  });

  // TODO: Add missing user via shared fn
  // Please use following structure for shared group
  // dib-travel/<feature-name>/shared/<shared-group-of-commands>.ts - please be descriptive
  // dib-travel/<feature-name>/index.ts - please export shared test command
  it('should delete Internal travel agent', () => {
    cy.visit('/profile/account');
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');
    cy.intercept('POST', '/api/secure/v1/customers/*/internal-travel-agents').as('postInternalTravelAgents');

    cy.wait('@getEmployees');

    // Fix custom delay in implementation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('dib-profile dib-account dib-internal-agents .--first')
      .contains(profileDetails.internalTravelAgent.employee)
      .next('.--middle')
      .next('.--last')
      .find('ui-button')
      .click();

    cy.wait('@postInternalTravelAgents');

    cy.get('dib-profile dib-account dib-internal-agents').should(
      'not.contain',
      profileDetails.internalTravelAgent.employee
    );
    cy.visit('/people-management/employees');
    deleteEmployee();
  });
});
