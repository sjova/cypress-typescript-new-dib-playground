import { User } from '../shared';

export interface TravelSettings {
  flight: Flight;
  modifiedFlight: Flight;
  hotel: Hotel;
  train: Train;
  taxi: Taxi;
  sharedDetails: SharedDetails;
  employee: Pick<User, 'firstName' | 'lastName' | 'email'>;
  companyRates: CompanyRates;
}

export interface SharedDetails {
  name: string;
  numberOfDaysInAdvance: string;
  budget: string;
  modifiedName: string;
  modifiedNumberOfDaysInAdvance: string;
  modifiedBudget: string;
}

interface Flight {
  type: string;
  budgetException: string;
  durationBudgetException: string;
  from: string;
  to: string;
  ticketType: string;
  budgetPerFlight: string;
}

interface Hotel {
  type: string;
  city: string;
  modifiedCity: string;
  budgetPerNight: string;
  modifiedBudgetPerNight: string;
}

interface Train {
  type: string;
  from: string;
  to: string;
  budgetPerTrain: string;
  modifiedBudgetPerTrain: string;
  modifiedFrom: string;
  modifiedTo: string;
}
interface Taxi {
  type: string;
}
export interface CompanyRates {
  discountName: string;
  discountCode: string;
  modifiedDiscountName: string;
  modifiedDiscountCode: string;
}
