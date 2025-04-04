import { IconSymbol } from '@/components/ui/IconSymbol';
import { Barcode } from 'expo-barcode-generator';
import { BlurView } from 'expo-blur';
import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function Modal() {
  const { title, color } = useLocalSearchParams();

  return (
    <Animated.View
      entering={FadeIn}
      style={{ ...styles.modal, backgroundColor: `#${color}` || 'rgba(0, 0, 0, 0.5)' }}
    >
      <BlurView intensity={20} style={styles.header}>
        <Text style={styles.headerTitle}>CARD TEXT {title}</Text>
        <Link href="../" asChild>
          <TouchableOpacity
            style={styles.closeButton}
          >
            <IconSymbol
              size={24}
              color="#FFFFFF"
              name="xmark.circle.fill"
            />
          </TouchableOpacity>
        </Link>
      </BlurView>

      <View
        style={styles.barcodeWrapper}
      >
        <Barcode
          value='3000003062224'
          options={{
            format: 'ean13',
            background: '#FFFFFF',
            width: 3,
          }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 45,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  barcodeWrapper: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '96%',
  },
})