import { User } from './user';

// TODO: Revisit usage
export type Employee = Pick<User, 'firstName' | 'lastName' | 'email'>;

export interface EmployeeExtended extends Employee {
  modifiedFirstName: string;
  modifiedLastName: string;
}
