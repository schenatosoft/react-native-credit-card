import cardValidator from 'card-validator';
import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { ICreditCard } from '../../Model/ICreditCard';
import { ICreditCardInput } from './Interfaces/ICreditCardInput';

const CreditCard: FC<ICreditCardInput> = ({ inputStyles }) => {
  const [cardValues, setCardValues] = useState<ICreditCard>({
    cardNumber: '',
    cvc: 0,
    holderName: '',
    validation: 0,
    isValid: false,
  });

  const [cardType, setCardType] = useState<{
    maskNumber: string;
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
    type: 'unknow',
    card: null,
  });

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.containerTop}>
        <Text style={styles.containerTitle}>Cartão de crédito</Text>
        <Text style={styles.containerSubTitle}>Para utilizar débito, consulte as condições de uso.</Text>
        <SafeAreaView style={styles.cardIcons}></SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.inputRow}>
        {cardValues.cardNumber.length > 0 && <Text style={styles.defaultLabel}>Número do cartão</Text>}
        <TextInputMask
          type="custom"
          options={{
            mask: cardType.maskNumber,
          }}
          value={cardValues.cardNumber}
          style={[styles.defaultInputs]}
          placeholder="Número do Cartão"
          keyboardType="numeric"
          includeRawValueInChangeText={true}
          onChangeText={(value, rawText) => {
            console.log(rawText);
            setCardValues({
              ...cardValues,
              cardNumber: rawText || '',
            });
            const card = cardValidator.number(rawText);
            console.log(card);
            if (card && card.card) {
              let maskCard = '';
              const cardLenght = card.card.lengths[card.card.lengths.length - 1];
              for (let index = 0; index < cardLenght; index++) {
                maskCard += '9';
              }
              console.log(maskCard);
              setCardType({
                type: card.card.type,
                maskNumber: maskCard,
                card: card.card,
              });
            }
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  containerTop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  containerSubTitle: {
    fontSize: 11,
  },
  cardIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
  defaultInputs: {
    display: 'flex',
    textAlign: 'left',
    color: 'rgb(32, 32, 32)',
    borderBottomWidth: 0.8,
    borderBottomColor: 'red',
    opacity: 0.8,
    minHeight: 40,
  },
  defaultLabel: {
    fontSize: 10,
    marginLeft: 5,
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
});

export default CreditCard;
