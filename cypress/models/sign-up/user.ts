import { User } from '../user';

export interface SignUpUser extends User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  companyRegistrationNumber: string;
  companyCountry: string;
}
