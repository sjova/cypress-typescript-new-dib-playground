/**
 * Get sign up email with hash string
 *
 * @param {string} signUpEmail - Sign up email (predefined pattern: `qa.tools+cy.<environment>.<page>.hash@dibtravel.com`)
 * @returns {string} email with hash (ex. `qa.tools+cy.ci.sign-up.kqanocpn@dibtravel.com`)
 * @example
 *    getSignUpEmailWithHash('qa.tools+cy.ci.sign-up.hash@dibtravel.com')
 */
export const getSignUpEmailWithHash = (signUpEmail: string): string => {
  const hash = Date.now().toString(36);
  return signUpEmail.replace('hash', hash);
};
