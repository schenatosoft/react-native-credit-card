import {StyleProp, TextStyle} from 'react-native';
import {ICreditCard} from '../../../Model/ICreditCard';

export interface ICreditCardInput {
  onChange: (card: ICreditCard) => void;
  supportDebitCards?: boolean;
}
