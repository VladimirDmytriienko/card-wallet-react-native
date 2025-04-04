
import { ThemedView } from '@/components/ThemedView';
import CardsListComponent from '@/components/Wallet/CardsListComponent';

import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Animated, FlatList } from 'react-native';
import Modal from '../modal';
import ModalScanner from '@/components/ModalScanner/ModalScanner';


const CardList = () => {
  return (
    <View>
      <ModalScanner />
      <CardsListComponent />
    </View>


  );
};

export default CardList;

