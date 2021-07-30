export interface ProfileDetails {
  personalInfo: {
    firstName: string;
    lastName: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
  };
  contactInfo: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
  };
  localize: {
    language: string;
    currency: string;
  };
  emailAndPassword: {
    email: string;
    password: string;
  };
  travelDocuments: {
    documentType: string;
    gender: string;
    documentNumber: string;
    issuingCountry: string;
    changeIssuingCountry: string;
    expiryDay: string;
    expiryMonth: string;
    expiryYear: string;
    nationality: string;
  };
  internalTravelAgent: {
    firstName: string;
    lastName: string;
    email: string;
  };
  loyaltyProgram: {
    provider: string;
    number: string;
  };
}
