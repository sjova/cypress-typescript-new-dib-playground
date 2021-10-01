import { User } from '../shared';

export interface PaymentMethod {
  companyInformation: CompanyInformation;
  primaryContact: PrimaryContact;
  lodgeCard: LodgeCard;
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
interface LodgeCard {
  provider: string;
  name: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  currency: string;
}

interface InvoiceRecipient {
  email: string;
  vatNumber: string;
}
