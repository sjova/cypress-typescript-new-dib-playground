import { PaymentMethod } from '../../../../models';

describe('Company Settings - Payment Method - Lodge Cards', () => {
  let paymentMethodForm: PaymentMethod;

  const openEditLodgeCardForm = () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item')
      .contains(paymentMethodForm.primaryContactInformation.email)
      .parents('dib-lodge-cards')
      .find('ui-button')
      .contains('edit')
      .clickAttached();
  };

  const openArchiveLodgeCardForm = () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item')
      .contains(paymentMethodForm.primaryContactInformation.email)
      .parents('dib-lodge-cards')
      .find('ui-button')
      .contains(' archive ')
      .clickAttached();
  };

  before(() => {
    cy.fixture('company-settings/payment-method-form').then((paymentMethodFixture) => {
      paymentMethodForm = paymentMethodFixture;
    });
  });

  beforeEach(() => {
    cy.loginAgent();
    cy.visit('/company-management/payment-method/lodge-cards');
  });

  it('should create lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyLegalName]').type(
      paymentMethodForm.companyInformation.companyLegalName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyRegistrationNumber]').type(
      paymentMethodForm.companyInformation.companyRegistrationNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=vatNumber]').type(
      paymentMethodForm.companyInformation.vatNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=addressLine]').type(
      paymentMethodForm.companyInformation.address
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=postalCode]').type(
      paymentMethodForm.companyInformation.zipCode
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=city]').type(
      paymentMethodForm.companyInformation.city
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-autocomplete').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-autocomplete input').type(
      paymentMethodForm.companyInformation.country
    );
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.companyInformation.country)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]').type(
      paymentMethodForm.primaryContactInformation.firstName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactLastName]').type(
      paymentMethodForm.primaryContactInformation.lastName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactEmail]').type(
      paymentMethodForm.primaryContactInformation.email
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown[formcontrolname=provider]').click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.lodgeCardDetails.cardProvider)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=lodgeCardName]').type(
      paymentMethodForm.lodgeCardDetails.cardName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=creditCardNumber]').type(
      paymentMethodForm.lodgeCardDetails.cardNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown[formcontrolname=month]').click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.lodgeCardDetails.month)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown[formcontrolname=year]').click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.lodgeCardDetails.year)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown[formcontrolname=currency').click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.currencies.currency)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethodForm.invoices.invoiceRecipientEmail
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethodForm.primaryContactInformation.email
    );
  });

  it('should close form for creating lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog button').contains(' Cancel ').click();

    cy.get('dib-company-management dib-payment-method dib-lodge-cards h1').should('contain', ' Lodge Cards ');
  });

  it('should update lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');
    openEditLodgeCardForm();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]')
      .clear()
      .type(paymentMethodForm.primaryContactInformation.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactLastName]')
      .clear()
      .type(paymentMethodForm.primaryContactInformation.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactEmail]')
      .clear()
      .type(paymentMethodForm.primaryContactInformation.modifiedEmail);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethodForm.primaryContactInformation.modifiedEmail
    );
  });

  it('should close dialog for editing lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');
    openEditLodgeCardForm();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog button').contains(' Cancel ').click();

    cy.get('dib-company-management dib-payment-method dib-lodge-cards h1').should('contain', ' Lodge Cards ');
  });

  it('should try to submit empty form for creating lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('be.visible');
  });

  it('should check cancellation of confirmation dialog', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');
    openArchiveLodgeCardForm();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethodForm.primaryContactInformation.modifiedEmail
    );
  });

  it('should archive lodge card', () => {
    openArchiveLodgeCardForm();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('dib-company-management dib-payment-method dib-lodge-cards .items').should(
      'contain',
      ' You have not added any lodge cards yet. '
    );
  });
});
