import { User } from './user';

// TODO: Revisit this later
export type Employee = Pick<User, 'firstName' | 'lastName' | 'email'>;

export interface EmployeeExtended extends Employee {
  modifiedFirstName: string;
  modifiedLastName: string;
}
