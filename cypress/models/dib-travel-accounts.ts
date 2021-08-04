// IMPORTANT: THIS INTERFACE SHOULD NOT BE MODIFIED

import { User } from './user';
export interface DibTravelAccounts {
  agentAccount: Pick<User, 'email' | 'password'>;
  defaultAccount: Pick<User, 'email' | 'password'>;
  invalidAccount: Pick<User, 'email' | 'password'>;
  signUpAccount: Pick<User, 'email' | 'password'>;
}
