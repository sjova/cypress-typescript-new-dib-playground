import { User } from '../shared';

export interface ApprovalProcessGroup {
  traveler: Pick<User, 'firstName' | 'lastName'>;
  travelersGroupName: string;
}
