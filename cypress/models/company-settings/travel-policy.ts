import { User } from '../user';

export interface TravelPolicy {
  flight: Flight;
  hotel: Hotel;
  train: Train;
  sharedDetails: SharedDetails;
  employee: Pick<User, 'firstName' | 'lastName' | 'email'>;
}

export interface SharedDetails {
  name: string;
  modifiedName: string;
  numberOfDaysInAdvance: string;
  budget: string;
}

interface Base {
  type: string;
}

interface Flight extends Base {
  budgetException: string;
  durationBudgetException: string;
  from: string;
  to: string;
  ticketType: string;
}

interface Hotel extends Base {
  city: string;
}

interface Train extends Base {
  from: string;
  to: string;
}
