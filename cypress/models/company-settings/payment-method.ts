import { User } from '../user';

export interface PaymentMethod {
  companyInformation: CompanyInformation;
  primaryContact: PrimaryContact;
  lodgeCardDetails: LodgeCardDetails;
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
interface LodgeCardDetails {
  cardProvider: string;
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  currency: string;
  securityCode: string; // TODO: Revisit since currently is not used?
}
interface InvoiceRecipient {
  email: string;
  vatNumber: string;
}
