import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import Card from '@/components/Card'


const CardList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Card List</Text>
      <Card />
    </SafeAreaView>
  )
}

export default CardList

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#b58',
  },

});