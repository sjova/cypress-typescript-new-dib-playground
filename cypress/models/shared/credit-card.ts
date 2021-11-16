export interface CreditCard {
  visa: CreditCardType;
  visa3DSecure: CreditCardType;
  mastercard: CreditCardType;
  dinersClub: CreditCardType;
  americanExpress: CreditCardType;
  discover: CreditCardType;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  zipCode: string;
}

interface CreditCardType {
  brand: string;
  number: string;
  cvv?: string;
}
