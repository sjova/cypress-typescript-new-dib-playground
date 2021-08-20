import { TravelPolicy } from '../../../../models';
import { addHotelTravelPolicy, deleteTravelPolicyAndConfirm } from './shared';

describe('Company Settings - Travel Policy - Hotel', () => {
  let travelPolicyDetails: TravelPolicy;

  before(() => {
    cy.fixture('company-settings/travel-policy-details').then((travelPolicyDetailsFixture) => {
      travelPolicyDetails = travelPolicyDetailsFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/travel-policy');
  });

  it('should add hotel travel policy', () => {
    addHotelTravelPolicy(travelPolicyDetails);

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  // TODO: This should be covered
  // it('should update hotel travel policy', () => {});

  it('should delete hotel travel policy', () => {
    cy.waitForAngular();

    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.name);
  });
});
