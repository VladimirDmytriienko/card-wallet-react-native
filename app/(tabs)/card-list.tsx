import Wallet from '@/components/Wallet/Wallet';
import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Animated, FlatList } from 'react-native';



const CardList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Wallet />
    </SafeAreaView>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    margin: 0
  },

});
