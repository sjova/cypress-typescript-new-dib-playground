import { User } from '../user';

export interface ProfileDetails {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  localize: Localize;
  emailAndPassword: Pick<User, 'email' | 'password'>;
  travelDocuments: TravelDocuments;
  internalTravelAgent: Omit<User, 'password'>;
  loyaltyProgram: LoyaltyProgram;
}

interface PersonalInfo extends Pick<User, 'firstName' | 'lastName'> {
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

interface ContactInfo {
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

interface Localize {
  language: string;
  currency: string;
}

interface TravelDocuments {
  documentType: string;
  gender: string;
  documentNumber: string;
  issuingCountry: string;
  changeIssuingCountry: string;
  expiryDay: string;
  expiryMonth: string;
  expiryYear: string;
  nationality: string;
}

interface LoyaltyProgram {
  flightProvider: string;
  trainProvider: string;
  number: string;
}
