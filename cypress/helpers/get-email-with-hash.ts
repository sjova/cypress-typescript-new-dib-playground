import { getTestingEnvironment } from './get-testing-environment';

/**
 * Get an email with the proper environment and generated hash
 *
 * Note: Plus sign in email address can't be used as an email inside of the Flights feature.
 * We need to revisit usage of this inside of Flights.
 *
 * @param {string} email - email with predefined pattern: `qa.tools+cy.[env].<feature or sub-feature>.[hash]@dibtravel.com`
 * @returns {string} email with generated hash (ex. `qa.tools+cy.ci.sign-up.kqanocpn@dibtravel.com`)
 * @example
 *    getEmailWithHash('qa.tools+cy.[env].sign-up.[hash]@dibtravel.com')
 *    getEmailWithHash('qa.tools+cy.[env].employees.[hash]@dibtravel.com')
 */
export const getEmailWithHash = (email: string): string => {
  const testingEnvironment = getTestingEnvironment();
  const hash = Date.now().toString(36);
  return email.replace('[env]', testingEnvironment).replace('[hash]', hash);
};
