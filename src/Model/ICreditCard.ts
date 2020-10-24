export interface ICreditCard {
  holderName: string;
  cardNumber: string;
  cvc: number;
  validation: number;

  isValid: boolean;
}
