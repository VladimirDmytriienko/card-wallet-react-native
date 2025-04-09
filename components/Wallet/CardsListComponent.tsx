import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Dimensions, StyleSheet, StatusBar, Animated, Button, Pressable } from "react-native";
import { Link, useRouter } from 'expo-router';
import { ThemedView } from '../ThemedView';
import { useCards } from '@/react-query/useCards';
import EmptyList from '../EmptyList/EmptyList';
import CameraPermission from '../CameraPermission/CameraPermission';
import { LinearGradient } from 'expo-linear-gradient';
import ModalButtomSheet from './ModalButtomSheet';
import * as Haptics from 'expo-haptics';
const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = 80;
const ITEM_SIZE = ITEM_HEIGHT + 12;
const VISIBLE_ITEMS = Math.floor(height / ITEM_HEIGHT) - 2;



const CardsListComponent = () => {
  const { cards } = useCards()
  const [show, setShow] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const router = useRouter()
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const handler = () => { setShow(prev => !prev) }
  return (
    <ThemedView style={styles.container}>
      <CameraPermission />
      {!cards?.length ? <EmptyList /> :
        <Animated.FlatList
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
            const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0.95],
            });

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });

            const onCardPress = () => {
              router.push({
                pathname: '/modal',
                params: {
                  title: item.name,
                  color: JSON.stringify(item.backgroundColor),
                  code: item.data,
                  type: item.type,
                }
              });
            }

            const onCardLongPress = () => {
              setSelectedCard(item)
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
              setShow(true)

            }

            const isGradient = Array.isArray(item.backgroundColor);
            const cardStyle = isGradient
              ? styles.card
              : [styles.card, { backgroundColor: item.backgroundColor }];

            const textStyle = [
              styles.itemText,
              {
                color: item.backgroundColor === '#FFFFFF' ? "#000" : '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2
              }
            ];

            return (
              <Animated.View
                style={[
                  styles.item,
                  {
                    opacity,
                    transform: [{ scale }],
                  },
                ]}
              >
                <Pressable
                  onPress={onCardPress}
                  onLongPress={onCardLongPress}
                  style={{ flex: 1, width: '100%' }}
                >
                  {isGradient ? (
                    <LinearGradient
                      colors={item.backgroundColor}
                      style={styles.card}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View>
                        <Text style={styles.itemText}>{item.name}</Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={cardStyle}>
                      <Text style={textStyle}>{item.name}</Text>
                    </View>
                  )}
                </Pressable>
              </Animated.View>
            );
          }}
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

      <ModalButtomSheet isVisible={show} onClose={handler}>
        {selectedCard && (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedCard.name}</Text>
            <Text style={{ marginTop: 8 }}>Тип: {selectedCard.type}</Text>
            <Text>Код: {selectedCard.data}</Text>
          </View>
        )}
      </ModalButtomSheet>


    </ThemedView >
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  card: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }
})

export default CardsListComponent