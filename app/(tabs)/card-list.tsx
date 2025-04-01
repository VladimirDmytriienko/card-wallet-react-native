
import CardsListComponent from '@/components/Wallet/CardsListComponent';
import Wallet from '@/components/Wallet/WalletFlatList';
import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Animated, FlatList } from 'react-native';



const CardList = () => {
  return (

    <CardsListComponent />

  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Светлый фон, чтобы тени выделялись
    paddingHorizontal: 0, // НЕ ставим отступы, иначе тени могут резаться
  },
});
