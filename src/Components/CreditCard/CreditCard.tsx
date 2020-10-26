import cardValidator from 'card-validator';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import InputMask from '../Inputs/InputMask/InputMask';
import { ICreditCardInput } from './Interfaces/ICreditCardInput';
import { CardIconImage, CardIcons, Container, ContainerHeader, Form, SubTitle, Title } from './Styles';

const CreditCard: FC<ICreditCardInput> = ({ onChange, supportDebitCards }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardValidation, setCardValidation] = useState<string>('');
  const [cardCode, setCardCode] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [cardIsValid, setCardIsValid] = useState<boolean>(false);

  const [cardType, setCardType] = useState<{
    maskNumber: string;
    maskCvv: string;
    type: string;
    card: {
      niceType: string;
      type: string;
      patterns: Array<number[] | number>;
      gaps: number[];
      lengths: number[];
      code: {
        name: string;
        size: number;
      };
    } | null;
  }>({
    maskNumber: '9999',
    maskCvv: '999',
    type: 'unknow',
    card: null,
  });

  useEffect(() => {
    if (onChange) {
      onChange({
        cardNumber,
        code: cardCode,
        holderName: cardHolderName,
        isValid: cardIsValid,
        validation: cardValidation,
      });
    }

    const card = cardValidator.number(cardNumber);
    setCardIsValid(card.isValid);

    if (card && card.card) {
      let maskCard = '';
      let maskCvv = '';
      const cardLenght = card.card.lengths[card.card.lengths.length - 1];
      for (let index = 0; index < cardLenght; index++) {
        if (index % 4 === 0 && index > 1) {
          maskCard += ' ';
        }
        maskCard += '9';
      }

      for (let index = 0; index < card.card.code.size; index++) {
        maskCvv += '9';
      }

      setCardType({
        type: card.card.type,
        maskNumber: maskCard,
        maskCvv,
        card: card.card,
      });
    }
  }, [cardNumber, cardValidator, cardCode, cardHolderName]);

  return (
    <Container>
      <ContainerHeader>
        <Title>Cartão de crédito {supportDebitCards && '/ Débito'}</Title>
        {supportDebitCards && <SubTitle>Para utilizar débito, consulte as condições de uso.</SubTitle>}
        <CardIcons>
          <CardIconImage
            resizeMethod="resize"
            resizeMode="contain"
            source={{
              uri:
                'https://github.com/schenatosoft/react-native-credit-card/raw/develop/src/Static/Icons/stp_card_amex.png',
            }}
          />
          <CardIconImage
            resizeMethod="resize"
            resizeMode="contain"
            source={{
              uri:
                'https://github.com/schenatosoft/react-native-credit-card/raw/develop/src/Static/Icons/stp_card_diners.png',
            }}
          />
          <CardIconImage
            resizeMethod="resize"
            resizeMode="contain"
            source={{
              uri:
                'https://github.com/schenatosoft/react-native-credit-card/raw/develop/src/Static/Icons/stp_card_elo.png',
            }}
          />
          <CardIconImage
            resizeMethod="resize"
            resizeMode="contain"
            source={{
              uri:
                'https://github.com/schenatosoft/react-native-credit-card/raw/develop/src/Static/Icons/stp_card_mastercard.png',
            }}
          />
          <CardIconImage
            resizeMethod="resize"
            resizeMode="contain"
            source={{
              uri:
                'https://github.com/schenatosoft/react-native-credit-card/raw/develop/src/Static/Icons/stp_card_visa.png',
            }}
          />
        </CardIcons>
      </ContainerHeader>
      <Form>
        <InputMask
          placeholder="Número do Cartão"
          fullLine
          type="custom"
          options={{
            mask: cardType.maskNumber,
          }}
          value={cardNumber}
          keyboardType="numeric"
          includeRawValueInChangeText={true}
          onChangeText={(value, rawText) => {
            setCardNumber(rawText || '');
          }}
        />
        <SafeAreaView
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <InputMask
            placeholder="Validade"
            type="custom"
            options={{
              mask: '99/99',
            }}
            value={cardValidation}
            keyboardType="numeric"
            includeRawValueInChangeText={true}
            onChangeText={(value, rawText) => {
              setCardValidation(rawText || '');
            }}
          />
          <InputMask
            placeholder={(cardType.card && cardType.card.code.name) || 'CVV'}
            type="custom"
            options={{
              mask: cardType.maskCvv,
            }}
            value={cardCode}
            keyboardType="numeric"
            includeRawValueInChangeText={true}
            onChangeText={(value, rawText) => {
              setCardCode(rawText || '');
            }}
          />
        </SafeAreaView>
        <InputMask
          placeholder={'Nome do Titular'}
          type="custom"
          fullLine
          value={cardHolderName}
          onChangeText={(value) => {
            setCardHolderName(value);
          }}
        />
      </Form>
    </Container>
  );
};

export default CreditCard;
