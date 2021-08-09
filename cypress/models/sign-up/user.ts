import { User } from '../user';

export interface SignUpUser extends User {
  phoneNumber: string;
  companyName: string;
  companyRegistrationNumber: string;
  companyCountry: string;
}
