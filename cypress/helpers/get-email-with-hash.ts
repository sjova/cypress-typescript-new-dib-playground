/**
 * Get email with hash string
 *
 * @param {string} email - email with predefined pattern: `qa.tools+cy.<environment>.<feature>.hash@dibtravel.com`
 * @returns {string} email with generated hash (ex. `qa.tools+cy.ci.sign-up.kqanocpn@dibtravel.com`)
 * @example
 *    getEmailWithHash('qa.tools+cy.ci.sign-up.hash@dibtravel.com')
 *    getEmailWithHash('qa.tools+cy.ci.company-employees.employees.hash@dibtravel.com')
 */
export const getEmailWithHash = (email: string): string => {
  const hash = Date.now().toString(36);
  return email.replace('hash', hash);
};
