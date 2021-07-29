// TODO: Group data the same as on UI/UX
// ex. personal info, contact info, reference fields, etc.
// and don't forget to update fixture
export interface ProfileDetails {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
  };
  contactInfo: {
    homeAddress: string;
    city: string;
    zipCode: string;
    country: string;
    mobileNumber: string;
  };
  localize: {
    language: string;
    currency: string;
  };
  emailAndPassword: {
    password: string;
  };
  travelDocuments: {
    title: string;
    documentType: string;
    documentNumber: string;
    issuingCountry: string;
    newIssuingCountry: string;
    expiryDay: string;
    expiryMonth: string;
    expiryYear: string;
    nationality: string;
  };
  internalTravelAgent: {
    employee: string;
  };
  loyaltyProgram: {
    loyaltyProgramProvider: string;
    loyaltyNumber: string;
  };
  newEmployee: {
    firstNameNewEmployee: string;
    lastNameNewEmployee: string;
    emailNewEmployee: string;
  };
}
