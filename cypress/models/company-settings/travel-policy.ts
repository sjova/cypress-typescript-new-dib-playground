import { User } from '../user';

export interface TravelPolicy {
  flight: Flight;
  modifiedFlight: Flight;
  hotel: Hotel;
  train: Train;
  sharedDetails: SharedDetails;
  employee: Pick<User, 'firstName' | 'lastName' | 'email'>;
}

export interface SharedDetails {
  name: string;
  numberOfDaysInAdvance: string;
  budget: string;
  modifiedName: string;
  modifiedNumberOfDaysInAdvance: string;
  modifiedBudget: string;
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
  budgetPerFlight: string;
}

interface Hotel extends Base {
  city: string;
  modifiedCity: string;
  budgetPerNight: string;
  modifiedBudgetPerNight: string;
}

interface Train extends Base {
  from: string;
  to: string;
  budgetPerTrain: string;
  modifiedBudgetPerTrain: string;
  modifiedFrom: string;
  modifiedTo: string;
}
