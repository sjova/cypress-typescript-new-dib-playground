import { User } from '../user';

export interface ApprovalProcess {
  traveler: Pick<User, 'firstName' | 'lastName'>;
  travelersGroupName: string;
}
