export interface PaymentMethod {
  companyInformation: CompanyInformation;
  primaryContactInformation: PrimaryContactInformation;
  lodgeCardDetails: LodgeCardDetails;
  search: Search;
  invoices: Invoices;
  currencies: Currencies;
}
interface CompanyInformation {
  companyLegalName: string;
  taxId: string;
  city: string;
  country: string;
  address: string;
  zipCode: string;
  companyRegistrationNumber: string;
  vatNumber: string;
}
interface PrimaryContactInformation {
  firstName: string;
  modifiedFirstName: string;
  lastName: string;
  modifiedLastName: string;
  email: string;
  modifiedEmail: string;
}
interface LodgeCardDetails {
  cardProvider: string;
  cardName: string;
  cardNumber: string;
  expireDate: string;
  month: string;
  year: string;
}
interface Currencies {
  currency: string;
}
interface Invoices {
  invoiceRecipientEmail: string;
}
interface Search {
  searchPeopleOrGroup: string;
}
