import { Employee } from '../shared';

export interface Group {
  name: string;
  description: string;
  modifiedName: string;
  modifiedDescription: string;
  employee: Employee;
}
