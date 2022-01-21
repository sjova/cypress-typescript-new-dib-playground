import { User } from '../shared';

export interface PaymentMethod {
  companyInformation: CompanyInformation;
  modifiedCompanyInformation: CompanyInformation;
  primaryContact: PrimaryContact;
  lodgeCard: LodgeCard;
  modifiedLodgeCard: LodgeCard;
  invoiceRecipient: InvoiceRecipient;
  groupName: string;
  currency: Currency;
}
interface CompanyInformation {
  companyLegalName: string;
  companyRegistrationNumber: string;
  vatNumber: string;
  taxId: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}
interface PrimaryContact extends Omit<User, 'password'> {
  modifiedFirstName: string;
  modifiedLastName: string;
  modifiedEmail: string;
}
interface LodgeCard {
  provider: string;
  name: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  expiryDateTrailingValue: string;
}
interface InvoiceRecipient {
  email: string;
  vatNumber: string;
  modifiedEmail: string;
  modifiedVatNumber: string;
}

interface Currency {
  originalCurrency: string;
  modifiedCurrency: string;
}
