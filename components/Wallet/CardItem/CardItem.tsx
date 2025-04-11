import React from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { Card } from '@/react-query/useCards'
import { styles } from '../styles'

interface CardItemProps {
  item: Card
  index: number;
  scrollY: Animated.Value
  onSelect: (card: Card) => void;
}

const ITEM_SIZE = 92;

const CardItem = ({ item, index, scrollY, onSelect }: CardItemProps) => {
  const router = useRouter();

  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]
  const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0.95],
  })

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
  })

  const onCardPress = () => {
    router.push({
      pathname: '/modal',
      params: {
        title: item.name,
        color: JSON.stringify(item.backgroundColor),
        code: item.data,
        type: item.type,
      },
    })
  }

  const onCardLongPress = () => {
    onSelect(item);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
  }

  const isGradient = Array.isArray(item.backgroundColor)
  const cardStyle = [
    styles.card,
    !Array.isArray(item.backgroundColor) && { backgroundColor: item.backgroundColor },
  ]
  const textStyle = [
    styles.itemText,
    {
      color: item.backgroundColor === '#FFFFFF' ? '#000' : '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  ]

  return (
    <Animated.View style={[styles.item, { opacity, transform: [{ scale }] }]}>
      <Pressable onPress={onCardPress} onLongPress={onCardLongPress} style={{ flex: 1, width: '100%' }}>
        {isGradient ? (
          <LinearGradient
            colors={item.backgroundColor as [string, string]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </LinearGradient>
        ) : (
          <View style={cardStyle}>
            <Text style={textStyle}>{item.name}</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  )
}

export default CardItem
