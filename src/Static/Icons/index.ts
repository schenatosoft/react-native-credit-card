export type CardIconName = 'unknown' | 'amex' | 'diners' | 'elo' | 'discover' | 'jcb' | 'mastercard' | 'verve' | 'visa';

const defaultCardIconName = 'stp_card_';
const fileExtension = '.png';

export default class CardIcon {
  static GetIconName = (name: CardIconName): string => {
    return `${defaultCardIconName}${name}${fileExtension}`;
  };
  static GetIconFile = (name: CardIconName): NodeRequire => {
    const cardIconName = CardIcon.GetIconName(name);
    return require(cardIconName);
  };
}
