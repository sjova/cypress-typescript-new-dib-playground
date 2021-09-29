import { User } from '../user';

export interface Group {
  name: string;
  description: string;
  modifiedName: string;
  modifiedDescription: string;
  employee: Pick<User, 'firstName' | 'lastName' | 'email'>;
}
