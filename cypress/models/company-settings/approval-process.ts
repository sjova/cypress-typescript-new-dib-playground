import { User } from '../shared';

export interface ApprovalProcess {
  traveler: Pick<User, 'firstName' | 'lastName'>;
  travelersGroupName: string;
}
