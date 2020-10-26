export interface ICreditCard {
  holderName: string;
  cardNumber: string;
  code: string;
  validation: string;

  isValid: boolean;
}
