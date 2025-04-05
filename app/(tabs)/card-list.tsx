import CardsListComponent from '@/components/Wallet/CardsListComponent';

import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Animated, FlatList } from 'react-native';



const CardList = () => {
  return (
    <View>
      <CardsListComponent />
    </View>
  )
}

export default CardList;

