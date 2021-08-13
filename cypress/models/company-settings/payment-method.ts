import { User } from '../user';

export interface PaymentMethod {
  companyInformation: CompanyInformation;
  primaryContact: PrimaryContact;
  creditCard: CreditCard;
  invoiceRecipient: InvoiceRecipient;
  person: Pick<User, 'firstName' | 'lastName'>;
  groupName: string;
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
interface CreditCard {
  cardProvider: string;
  cardName: string;
  lodgeCardNumber: string;
  creditCardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  currency: string;
  securityCode: string;
}
interface InvoiceRecipient {
  email: string;
  vatNumber: string;
}
