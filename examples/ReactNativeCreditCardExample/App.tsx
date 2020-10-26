/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {CreditCard} from '@schenatosoft/react-native-credit-card';
import cardValidator from 'card-validator';
import React, {FC, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <CreditCard
        onChange={(card) => {
          console.log('card values changes', card);
        }}
      />
    </>
  );
};

export default App;
