import { Group } from '@cy/models';

describe('Company Report - Analytics & Reporting', () => {
  let report: Group;

  before(() => {
    cy.fixture('company-employees/group').then((groupFixture) => {
      report = groupFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/reporting/analytics');
  });

  it('should display "Analytics & Reporting" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Analytics & Reporting').should('exist');
  });

  it('should check Analytics and Reporting page', () => {
    cy.get('dib-reporting dib-analytics-page h1').should('have.text', ' Analytics and Reporting ');

    cy.get('dib-reporting dib-analytics-page dib-analytics-dashboard h3')
      .should('contain', ' Total spend:')
      .should('contain', ' Cost drivers - Out of policy:')
      .should('contain', 'KPI: Cost drivers - Booking prior to travel: 0 days')
      .should('contain', ' Hotel spend - Star rating:')
      .should('contain', 'Hotel spend - Top 5 cities:')
      .should('contain', 'KPI: Hotel refundable cost:')
      .should('contain', 'Flight spend - Cabin class:')
      .should('contain', ' Flight spend - Top 5 destinations:')
      .should('contain', ' Flight spend - Top 5 Airlines:')
      .should('contain', ' Rail and Bus spend - Booking class:')
      .should('contain', ' Rail and Bus spend - Top 5 operators:')
      .should('contain', ' Rail and Bus spend - Top 5 destinations:')
      .should('contain', 'CO2 emission, company level');

    cy.get('dib-reporting dib-analytics-page p').should(
      'contain',
      "Here you can analyze the company's travel pattern. Expenses are calculated including VAT and taxes."
    );

    cy.get('dib-reporting dib-analytics-page dib-analytics-dashboard p')
      .should('contain', '(including VAT and taxes)')
      .should('contain', '(i.e. total spend that was booked out of policy)')
      .should('contain', '(i.e. average Nr of days when trips are booked prior to travel)')
      .should('contain', '(i.e. total hotel spend)')
      .should('contain', '(i.e. total hotel spend for 5 largest cities)')
      .should('contain', '(i.e. Total cost for the canceled reservation)')
      .should('contain', '(i.e. total flight spend)')
      .should('contain', '(i.e. total flight spend for 5 largest destinations)')
      .should('contain', '(i.e. total flight spend for 5 largest airlines)')
      .should('contain', '(i.e total spend per booking class)')
      .should('contain', '(i.e. total spend for top 5 operators)')
      .should('contain', '(i.e. total spend for top 5 destinations)');

    cy.get('dib-reporting dib-analytics-page dib-analytics-dashboard dib-pie-chart span').should(
      'contain',
      'No data to display'
    );
  });

  it('should check currency filter and date picker', () => {
    cy.get('dib-reporting dib-analytics-page .currency .placeholder').contains('RSD').click();
    cy.get('.cdk-overlay-container span .currency__name')
      .should('contain', 'Euro')
      .should('contain', 'Serbian Dinar')
      .should('contain', 'Swedish Krona')
      .should('contain', 'United States Dollar');
    cy.get('.cdk-overlay-container span .currency__code')
      .should('contain', '€')
      .should('contain', 'RSD')
      .should('contain', 'SEK')
      .should('contain', '$');

    cy.get('dib-reporting dib-analytics-page .date-range-picker').click();
    cy.get('.cdk-overlay-container sat-calendar-header').should('exist');
  });

  it('should check all selected details by default', () => {
    cy.get('dib-reporting dib-analytics-page dib-report-filters span').contains(' Show selected details ').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters .filter__name')
      .should('contain', 'User/Group')
      .should('contain', 'Cost Center')
      .should('contain', 'Payment Type')
      .should('contain', 'Tag');
    cy.get('dib-reporting dib-analytics-page dib-report-filters p')
      .should('contain', report.employee.firstName)
      .should('contain', report.employee.lastName)
      .should('contain', report.employee.email)
      .should('contain', 'AAA')
      .should('contain', 'Credit Card')
      .should('contain', '[No Tags]');
  });

  it('should check User/Group filter', () => {
    cy.get('dib-reporting dib-analytics-page dib-report-filters .placeholder').contains('User/Group').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container label .option__name').contains('CYQA Bot').click();

    cy.get('.cdk-overlay-container ui-button[type=success').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters span').contains(' Show selected details ').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters p')
      .should('not.contain', report.employee.firstName)
      .should('not.contain', report.employee.lastName)
      .should('not.contain', report.employee.email);
  });

  it('should check Cost Center filter', () => {
    cy.get('dib-reporting dib-analytics-page dib-report-filters .placeholder').contains('Cost Center').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container label .option__name').contains('Select all').click();

    cy.get('.cdk-overlay-container ui-button[type=success').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters span').contains(' Show selected details ').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters p').should('not.contain', 'AAA');
  });

  it('should check Payment Type filter', () => {
    cy.get('dib-reporting dib-analytics-page dib-report-filters .placeholder').contains('Payment Type').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container label .option__name').contains('Credit Card').click();

    cy.get('.cdk-overlay-container ui-button[type=success').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters span').contains(' Show selected details ').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters p').should('not.contain', 'Credit Card');
  });

  it('should check Tag filter', () => {
    cy.get('dib-reporting dib-analytics-page dib-report-filters .placeholder').contains('Tag').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container label .option__name').contains('[No Tags]').click();

    cy.get('.cdk-overlay-container ui-button[type=success').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters span').contains(' Show selected details ').click();

    cy.get('dib-reporting dib-analytics-page dib-report-filters p').should('not.contain', '[No Tags]');
  });
});
