import { getEmailWithHash } from '@cy/helpers';
import { Group, PaymentMethod } from '@cy/models';
import { addGroup, deleteGroup } from '../company-employees';
import {
  addBillingProfile,
  archiveBillingProfile,
  cancelAddingBillingProfile,
  clickBillingProfileCtaAction,
  submitEmptyBillingProfileFormAndConfirm,
} from './payment-method/helpers';
import { confirmFirstPagePreview, confirmSecondPagePreview } from './subscription/helpers';

describe('Company Settings - Subscription', () => {
  let paymentMethod: PaymentMethod;
  let group: Group;

  const subscriptionBaseLink = '/company-management/subscription';

  before(() => {
    cy.fixture('company-employees/group').then((groupFixture) => {
      group = groupFixture;
    });

    cy.fixture('company-settings/payment-method').then((paymentMethodFixture) => {
      paymentMethod = {
        ...paymentMethodFixture,
        primaryContact: {
          ...paymentMethodFixture.primaryContact,
          email: getEmailWithHash(paymentMethodFixture.primaryContact.email),
          modifiedEmail: getEmailWithHash(paymentMethodFixture.primaryContact.modifiedEmail),
        },
        invoiceRecipient: {
          ...paymentMethodFixture.invoiceRecipient,
          email: getEmailWithHash(paymentMethodFixture.invoiceRecipient.email),
          modifiedEmail: getEmailWithHash(paymentMethodFixture.invoiceRecipient.modifiedEmail),
        },
      };
    });
  });

  // TODO: Rethink a better way to execute prepare data actions instead of duplicated `before()`
  // Maybe load multiple fixtures and then execute prepare actions
  // eslint-disable-next-line mocha/no-sibling-hooks
  before(() => {
    cy.login();
    cy.visit('/people-management/groups');

    addGroup(group.name, group.description, `${group.employee.firstName} ${group.employee.lastName}`, false);
  });

  after(() => {
    cy.login();

    cy.visit('/people-management/groups');

    deleteGroup(group.name);
  });

  beforeEach(() => {
    cy.login();
    cy.visit(subscriptionBaseLink);
  });

  it('should display "Subscription" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Subscription').should('exist');
  });

  // TODO: Revisit under the hood logic behind current values
  it('should check Overview tab', () => {
    cy.get('dib-company-management dib-subscription dib-subscription-overview h3')
      .should('contain', 'Pricing plans')
      .should('contain', 'Licenses')
      .should('contain', 'Renewal date')
      .should('contain', 'Renewal subscription');
    cy.get('dib-company-management dib-subscription dib-subscription-overview .table-row p')
      .should('contain', ' Business Pro ')
      .should('contain', 'Apr 2, 2022');

    cy.get('dib-company-management dib-subscription dib-subscription-overview .row-value')
      .eq(1)
      .invoke('text')
      .then((numberOfLicenses) => {
        cy.visit(`${subscriptionBaseLink}/licenses`);

        cy.get(
          'dib-company-management dib-subscription dib-subscription-licenses .subscription-table__row__value'
        ).should('contain', numberOfLicenses);
      });

    cy.visit(`${subscriptionBaseLink}/overview`);

    cy.get('dib-company-management dib-subscription dib-subscription-overview .table-footer span').should(
      'have.text',
      'For any questions regarding your subscription '
    );
    cy.get('dib-company-management dib-subscription dib-subscription-overview .table-footer a').should(
      'have.text',
      ' contact us '
    );
  });

  // TODO: Revisit under the hood logic behind current values
  it('should check Pricing Plans tab', () => {
    cy.visit(`${subscriptionBaseLink}/pricing-plans`);

    cy.get('dib-company-management dib-subscription dib-subscription-pricing-plans h3')
      .should('contain', ' Business Pro')
      .should('contain', 'Enterprise');
    cy.get('dib-company-management dib-subscription dib-subscription-pricing-plans .subscription-table small').should(
      'contain',
      'Subscription renewal date: Apr 2, 2022',
      ' (days from now) '
    );
    cy.get('dib-company-management dib-subscription dib-subscription-pricing-plans button').should(
      'contain',
      ' Contact us '
    );
    cy.get('dib-company-management dib-subscription dib-subscription-pricing-plans .subscription-table span')
      .should('contain', 'See our ')
      .should('contain', ' for more information or');
    cy.get('dib-company-management dib-subscription dib-subscription-pricing-plans .subscription-table a')
      .should('contain', 'detailed pricing page ')
      .should('contain', ' contact us ');
  });

  it('should cancel form for Request Enterprise plan', () => {
    cy.visit(`${subscriptionBaseLink}/pricing-plans`);

    cy.get('dib-company-management dib-subscription dib-subscription-pricing-plans button')
      .contains(' Contact us ')
      .click();

    cy.get('.cdk-overlay-container dib-request-enterprise-dialog h2').should('contain', 'Request Enterprise plan');
    cy.get('.cdk-overlay-container dib-request-enterprise-dialog p').should(
      'contain',
      'Please fill in this form and we will contact you shortly. Thank you.'
    );

    cy.get('.cdk-overlay-container dib-request-enterprise-dialog button').contains(' Cancel ').click();

    cy.get('.cdk-overlay-container dib-request-enterprise-dialog').should('not.exist');
  });

  it('should send request for Enterprise plan', () => {
    cy.visit(`${subscriptionBaseLink}/pricing-plans`);

    cy.get('dib-company-management dib-subscription dib-subscription-pricing-plans button')
      .contains(' Contact us ')
      .click();
    cy.get('.cdk-overlay-container dib-request-enterprise-dialog button').contains(' Submit ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Thank you for contacting us, we will respond as soon as possible.'
    );
    cy.get('.cdk-overlay-container dib-request-enterprise-dialog').should('not.exist');
  });

  // TODO: Revisit under the hood logic behind current values
  // TODO: We need to do the internal calculation and to compare values (calculated vs. displayed)
  it('should check Licenses tab', () => {
    cy.visit(`${subscriptionBaseLink}/licenses`);

    cy.get('dib-company-management dib-subscription dib-subscription-licenses h3')
      .should('contain', ' Number of Licenses ')
      .should('contain', ' Additional Licenses ');
    cy.get('dib-company-management dib-subscription dib-subscription-licenses p')
      .should('contain', ' Subscription renewal date: Apr 2, 2022', ' (days from now) ')
      .should('contain', ' 72 EUR per user ');
    cy.get('dib-company-management dib-subscription dib-subscription-licenses .subscription-table__row__pricing')
      .should('contain', ' 1 x 72 EUR = 72 EUR ')
      .should('contain', ' Total cost: 72 EUR ');

    cy.get('dib-company-management dib-subscription dib-subscription-licenses dib-tooltip:first')
      .invoke('show')
      .contains('info_outline')
      .trigger('mouseover', 'bottom')
      .click();
    cy.get('.tooltip-content').should(
      'contain',
      'Additional licenses will be valid until the Apr 01, 2022, after which they will be automatically renewed.'
    );
    cy.get('dib-company-management dib-subscription dib-subscription-licenses dib-tooltip')
      .eq(1)
      .invoke('show')
      .contains('info_outline')
      .trigger('mouseover', 'bottom')
      .click();
    cy.get('.tooltip-content').should('contain', 'Price of the next licence');
    cy.get('dib-company-management dib-subscription dib-subscription-licenses dib-tooltip:last')
      .invoke('show')
      .contains('info_outline')
      .trigger('mouseover', 'bottom')
      .click();
    cy.get('.tooltip-content').should(
      'contain',
      'If you purchase a license during a month, we will prorate the price on your first invoice'
    );
  });

  it('should increment/decrement number of licenses', () => {
    cy.visit(`${subscriptionBaseLink}/licenses`);

    cy.get('dib-company-management dib-subscription dib-subscription-licenses button i').contains('add').click();

    cy.get('dib-company-management dib-subscription dib-subscription-licenses input').should('have.value', '2');

    cy.get('dib-company-management dib-subscription dib-subscription-licenses button i').contains('remove').click();

    cy.get('dib-company-management dib-subscription dib-subscription-licenses input').should('have.value', '1');
  });

  it('should cancel confirmation dialog for buying new license', () => {
    cy.visit(`${subscriptionBaseLink}/licenses`);

    cy.get('dib-company-management dib-subscription dib-subscription-licenses ui-button').contains('Buy now').click();

    cy.get('.cdk-overlay-container confirmation-dialog button').contains(' No ').click();

    cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
  });

  // TODO: Rethink a better way to organize this test below (we may not need `reload()` in the future)
  it('should buy new license for subscription', () => {
    cy.visit(`${subscriptionBaseLink}/licenses`);

    cy.intercept('GET', '/api/secure/v2/corporations/*/subscriptions/current').as('currentSubscriptionState');

    cy.get('dib-company-management dib-subscription dib-subscription-licenses .subscription-table__row__value').then(
      (numberOfLicenses) => {
        const numberBeforePurchase = parseInt(numberOfLicenses.text());
        const numberAfterPurchase = parseInt(numberOfLicenses.text());

        cy.get('dib-company-management dib-subscription dib-subscription-licenses ui-button').contains('Buy').click();
        cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Buy ').click();

        cy.get('.cdk-overlay-container simple-snack-bar > span')
          .invoke('text')
          .then((message) => {
            expect(message).to.be.oneOf(['Purchase completed successfully', 'Purchase could not be completed']);
          });

        cy.reload();

        cy.wait('@currentSubscriptionState').then(() => {
          if (numberBeforePurchase == numberBeforePurchase + 1) {
            expect(numberAfterPurchase).to.eq(numberBeforePurchase + 1);
          } else {
            expect(numberAfterPurchase).to.eq(numberBeforePurchase);
          }
        });
      }
    );
  });

  it('should cancel form for adding billing profile', () => {
    cy.visit(`${subscriptionBaseLink}/payment-method`);

    cy.get('dib-company-management dib-subscription dib-subscription-payment-method span')
      .contains(' Add New Billing Profile ')
      .click();

    cancelAddingBillingProfile();
  });

  it('should not be able to submit an empty billing profile form', () => {
    cy.visit(`${subscriptionBaseLink}/payment-method`);

    cy.get('dib-company-management dib-subscription dib-subscription-payment-method span')
      .contains(' Add New Billing Profile ')
      .click();

    submitEmptyBillingProfileFormAndConfirm();
  });

  // TODO: This should be revisited (more specific: `addBillingProfile` method)
  it('should add a billing profile', () => {
    cy.visit(`${subscriptionBaseLink}/payment-method`);

    cy.get('dib-company-management dib-subscription dib-subscription-payment-method span')
      .contains(' Add New Billing Profile ')
      .click();

    cy.waitForAngular();

    addBillingProfile(paymentMethod);

    cy.visit('/company-management/payment-method/billing-profiles');

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content')
      .should('contain', paymentMethod.companyInformation.taxId)
      .should('contain', paymentMethod.primaryContact.firstName)
      .should('contain', paymentMethod.primaryContact.lastName)
      .should('contain', paymentMethod.primaryContact.email)
      .should('contain', paymentMethod.companyInformation.address)
      .should('contain', 1)
      .should('contain', paymentMethod.currency.originalCurrency)
      .should('contain', paymentMethod.invoiceRecipient.email)
      .should('contain', paymentMethod.invoiceRecipient.vatNumber);

    clickBillingProfileCtaAction(paymentMethod.primaryContact.email, 'Archive ');
    archiveBillingProfile();
  });

  it('should check Purchase History tab', () => {
    cy.visit(`${subscriptionBaseLink}/purchase-history`);

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history p')
      .should('contain', ' Date ')
      .should('contain', ' Invoice number ')
      .should('contain', ' Description ')
      .should('contain', ' Amount ')
      .should('contain', ' Status ')
      .should('contain', ' Invoice ')
      .should('contain', 'Apr')
      .should('contain', 'ci-')
      .should(
        'contain',
        ' Upgrade to subscription plan BUSINESS PRO ANNUAL .',
        ' 1 license(s) have been added in [BUSINESS PRO] ANNUAL plan. '
      )
      .should(
        'contain',
        'License(s) added to subscription.',
        '1 license(s) have been added in [BUSINESS PRO] ANNUAL plan.'
      )
      .should('contain', 'EUR')
      .should('contain', 'RSD')
      .should('contain', ' Completed ')
      .should('contain', ' Download invoice ');
  });

  it('should check pagination on Purchase History tab', () => {
    cy.visit(`${subscriptionBaseLink}/purchase-history`);

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history page-pagination ul li')
      .contains('2')
      .click();

    confirmSecondPagePreview();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history page-pagination ul li')
      .contains('1')
      .click();

    confirmFirstPagePreview();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history page-pagination i')
      .contains('keyboard_arrow_right')
      .click();

    confirmSecondPagePreview();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history page-pagination i')
      .contains('keyboard_arrow_left')
      .click();

    confirmFirstPagePreview();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history page-pagination i')
      .contains('last_page')
      .click();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history p').should(
      'not.contain',
      ' Apr 2, 2021 '
    );

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history page-pagination i')
      .contains('first_page')
      .click();

    confirmFirstPagePreview();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history page-pagination span')
      .contains('20')
      .click();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history p').should(
      'contain',
      ' Apr 2, 2021 ',
      ' Nov 18, 2021 '
    );

    cy.reload();

    cy.get('dib-company-management dib-subscription dib-subscription-purchase-history p').should(
      'not.contain',
      ' Nov 18, 2021 '
    );
  });
});
