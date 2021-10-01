import { User } from '../shared';

export interface SignUpUser extends User {
  phoneNumber: string;
  companyName: string;
  companyRegistrationNumber: string;
  companyCountry: string;
}
