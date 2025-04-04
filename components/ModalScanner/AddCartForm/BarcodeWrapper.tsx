import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
const BarcodeWrapper = ({ backgroundColor, children, shadowColor }: {
  backgroundColor: string | string[],
  children: React.ReactNode,
  shadowColor: string,
}) => {
  if (Array.isArray(backgroundColor)) {
    return (
      <LinearGradient
        colors={backgroundColor}
        style={[styles.barcodeWrapper, { shadowColor }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.barcodeWrapper,
        { backgroundColor, shadowColor },
      ]}
    >
      {children}
    </View>
  );
}
export default BarcodeWrapper

const styles = StyleSheet.create({

  barcodeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
    marginTop: 20,
  },
});