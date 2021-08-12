export const getSection = (sectionLabel: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy
    .get('dib-profile dib-account .profile-info .profile-info__title')
    .contains(sectionLabel)
    .parent('.profile-info__section');
};
