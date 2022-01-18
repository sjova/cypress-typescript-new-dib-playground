/**
 * Get testing environment based on `baseUrl` from Cypress configuration
 *
 * @returns {string} - testing environment (lowercase)
 * @example
 *    getTestingEnvironment()
 *
 *    const testingEnvironment = getTestingEnvironment();
 *    if (testingEnvironment === 'staging') {
 *      // staging specific
 *    } else if (testingEnvironment === 'ci') {
 *      // ci specific
 *    } else {
 *      // production specific
 *    }
 */
export const getTestingEnvironment = (): string => {
  const baseUrl = String(Cypress.config('baseUrl'));

  // TODO: Remove ` || baseUrl.startsWith('https://other-e2e-')` after `14.1.0` release
  if (baseUrl.startsWith('https://release-') || baseUrl.startsWith('https://other-e2e-')) {
    // https://release-xx-yy-zz--dib-travel.netlify.app/
    return 'staging';
  } else if (baseUrl.startsWith('https://develop--dib-travel.netlify.app')) {
    // https://develop--dib-travel.netlify.app/
    return 'ci';
  } else if (baseUrl.startsWith('https://app.dibtravel.com')) {
    // https://app.dibtravel.com/
    return 'production';
  } else {
    return 'unknown';
  }
};
