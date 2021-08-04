import { User } from '../user';

export interface Employee extends Omit<User, 'password'> {
  modifiedFirstName: string;
  modifiedLastName: string;
}
