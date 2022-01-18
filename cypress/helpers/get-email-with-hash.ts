import { getTestingEnvironment } from './get-testing-environment';

/**
 * Get an email with the proper environment and generated hash
 *
 * @param {string} email - email with predefined pattern: `qa.tools+cy.<environment>.<feature or sub-feature>.[hash]@dibtravel.com`
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
