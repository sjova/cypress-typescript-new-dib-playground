import { getEmailWithHash } from '@cy/helpers';
import { ProfileDetails } from '@cy/models';
import { addEmployee, archiveEmployee } from '../company-employees';

describe('Personal Settings - Profile - Internal Travel Agent', () => {
  let profileDetails: ProfileDetails;

  before(() => {
    cy.fixture('personal-settings/profile-details').then((profileDetailsFixture) => {
      profileDetails = {
        ...profileDetailsFixture,
        internalTravelAgent: {
          ...profileDetailsFixture.internalTravelAgent,
          email: getEmailWithHash(profileDetailsFixture.internalTravelAgent.email),
        },
      };
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('should add Internal travel agent', () => {
    cy.visitAngularUrl('/people-management/employees');
    addEmployee(
      profileDetails.internalTravelAgent.firstName,
      profileDetails.internalTravelAgent.lastName,
      profileDetails.internalTravelAgent.email
    );

    cy.visitAngularUrl('/profile/account');

    cy.waitForAngular();

    cy.get('dib-profile dib-account dib-internal-agents ui-button').contains('Add').click();

    cy.get('.cdk-overlay-container dib-internal-agents-dialog dib-assign-members dib-input input').type(
      profileDetails.internalTravelAgent.email
    );

    cy.get('.cdk-overlay-container dib-internal-agents-dialog dib-assign-members .member .user')
      .contains(`${profileDetails.internalTravelAgent.firstName} ${profileDetails.internalTravelAgent.lastName}`)
      .click();
    cy.get('.cdk-overlay-container dib-internal-agents-dialog ui-button').contains('Add').click();

    cy.get('dib-profile dib-account dib-internal-agents .--first').should(
      'contain',
      `${profileDetails.internalTravelAgent.firstName} ${profileDetails.internalTravelAgent.lastName}`
    );
  });

  it('should delete Internal travel agent', () => {
    cy.visitAngularUrl('/profile/account');

    cy.waitForAngular();

    cy.get('dib-profile dib-account dib-internal-agents .--first')
      .contains(`${profileDetails.internalTravelAgent.firstName} ${profileDetails.internalTravelAgent.lastName}`)
      .next('.--middle')
      .next('.--last')
      .find('ui-button')
      .click();

    cy.get('dib-profile dib-account dib-internal-agents').should(
      'not.contain',
      `${profileDetails.internalTravelAgent.firstName} ${profileDetails.internalTravelAgent.lastName}`
    );

    cy.visitAngularUrl('/people-management/employees');
    archiveEmployee(profileDetails.internalTravelAgent, false);
  });
});
