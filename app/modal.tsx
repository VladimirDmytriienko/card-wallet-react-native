import { useEffect, useRef } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Barcode } from 'expo-barcode-generator';
import { BlurView } from 'expo-blur';
import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Brightness from 'expo-brightness';
interface ParamsOptions {
  title: string;
  color: string;
  code: string;
  type: string;
}

export default function Modal() {
  const originalBrightness = useRef<number>()
  const { title, color, code, type } = useLocalSearchParams<ParamsOptions>();
  const parsedColor = JSON.parse(color)

  useEffect(() => {
    const setBrightness = async () => {
      originalBrightness.current = await Brightness.getSystemBrightnessAsync()
      await Brightness.setSystemBrightnessAsync(1)
    }
    setBrightness()
    return () => {
      if (originalBrightness.current !== undefined) Brightness.setSystemBrightnessAsync(originalBrightness.current)
    }
  }, [])
  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      {Array.isArray(parsedColor) ? (
        <LinearGradient colors={parsedColor}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Content title={title} code={code} type={type} />
        </LinearGradient>
      ) : (
        <Content title={title} code={code} type={type} color={parsedColor} />
      )}
    </Animated.View>
  );
}

function Content({ title, code, type, color }: { title: string; code: string; type: string; color?: string }) {
  return (
    <View style={[styles.modal, { backgroundColor: color }]}>
      <BlurView intensity={20} style={styles.header}>
        <Text style={styles.headerTitle}> {title} </Text>
        <Link href="../" asChild>
          <TouchableOpacity style={styles.closeButton}>
            <IconSymbol size={24} color="#FFFFFF" name="xmark.circle.fill" />
          </TouchableOpacity>
        </Link>
      </BlurView>

      <View style={styles.barcodeWrapper}>
        {
          type === 'qr' ?
            <QRCode
              value={code}
              size={200}
            />
            :
            <Barcode value={code} options={{ format: type, background: '#FFFFFF', width: 3 }} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
  },
})