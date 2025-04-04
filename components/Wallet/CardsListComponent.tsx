import React from "react";
import { View, FlatList, Text, Dimensions, StyleSheet, StatusBar, Animated } from "react-native";
import { Link } from 'expo-router';
import { ThemedView } from '../ThemedView';
const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = 80;
const ITEM_SIZE = ITEM_HEIGHT + 12;
const VISIBLE_ITEMS = Math.floor(height / ITEM_HEIGHT) - 2;

const mockData = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`
}));

const CardsListComponent = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <ThemedView >
      <Animated.FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
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
          const cardData = {
            id: item.id,
            title: item.title,
            color: 'f5f5',
          };
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
              <Link href={{
                pathname: '/modal',
                params: cardData,
              }} style={styles.link}>
                <Text style={styles.itemText}>{item.title}</Text>

              </Link>
            </Animated.View>
          );
        }}
        initialNumToRender={VISIBLE_ITEMS}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: StatusBar.currentHeight || 42,
          paddingBottom: 20,
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#f5f5f5",
  // },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#fff",
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
    color: "#333",
  },
});

export default CardsListComponent;
