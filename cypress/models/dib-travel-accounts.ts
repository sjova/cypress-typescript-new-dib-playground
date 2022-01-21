// IMPORTANT: THIS INTERFACE SHOULD NOT BE MODIFIED

import { User } from './shared';
export interface DibTravelAccounts {
  agentAccount: Pick<User, 'email' | 'password'>;
  defaultAccount: User;
  invalidAccount: Pick<User, 'email' | 'password'>;
  signUpAccount: Pick<User, 'email' | 'password'>;
}
