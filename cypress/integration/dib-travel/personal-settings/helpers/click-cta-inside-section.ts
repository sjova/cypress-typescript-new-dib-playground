export const clickCtaInsideSection = (sectionLabel: string, ctaButtonLabel?: string): void => {
  if (ctaButtonLabel) {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains(sectionLabel)
      .parent('.profile-info__section')
      .find('ui-button')
      .contains(ctaButtonLabel)
      .click();
  } else {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains(sectionLabel)
      .parent('.profile-info__section')
      .find('ui-button')
      .click();
  }
};
