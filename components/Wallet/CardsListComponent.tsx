import React, { useState } from "react";
import { Dimensions, StatusBar, Animated } from "react-native";

import { ThemedView } from '../ThemedView';
import { Card, useCards } from '@/react-query/useCards';
import EmptyList from '../EmptyList/EmptyList';
import CameraPermission from '../CameraPermission/CameraPermission';
import EditModalWrapper from './EditModalWrapper/EditModalWrapper';
import ModalBottomSheet from '../ModalBottomSheet/ModalButtomSheet';
import { styles } from './styles';
import CardItem from './CardItem/CardItem';

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = 80;
const VISIBLE_ITEMS = Math.floor(height / ITEM_HEIGHT) - 2;


const CardsListComponent = React.memo(() => {
  const { cards } = useCards()
  const [show, setShow] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const scrollY = React.useRef(new Animated.Value(0)).current

  return (
    <ThemedView style={styles.container}>
      <CameraPermission />
      {!cards?.length ? <EmptyList /> :
        <Animated.FlatList
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CardItem item={item} index={index} scrollY={scrollY} onSelect={(card) => {
              setSelectedCard(card);
              setShow(true);
            }} />
          )}
          initialNumToRender={VISIBLE_ITEMS}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )
          }
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: StatusBar.currentHeight || 42,
            paddingBottom: 20,
          }}
        />
      }
      <ModalBottomSheet isVisible={show} onClose={() => setShow(false)}>
        <EditModalWrapper selectedCard={selectedCard} onClose={() => setShow(false)} />
      </ModalBottomSheet >

    </ThemedView >
  );
})

export default CardsListComponent