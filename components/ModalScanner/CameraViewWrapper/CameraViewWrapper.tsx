import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { SUPPORTED_BARCODE_TYPES } from '../modalScannerServices';
import { IconSymbol } from '@/components/ui/IconSymbol'

const CameraViewWrapper = () => {
  const handleBarcodeScanned = () => console.log('Barcode scanned!')
  const handleCamera = () => console.log('Camera closed!');

  return (
    <CameraView
      style={styles.camera}
      facing={'back'}
      barcodeScannerSettings={{
        barcodeTypes: SUPPORTED_BARCODE_TYPES as BarcodeType[],
      }}
      onBarcodeScanned={handleBarcodeScanned}
    >
      <BlurView intensity={20} style={styles.header}>
        <Text style={styles.headerTitle}>Scan your code</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCamera}
        >
          <IconSymbol
            size={24}
            color="#FFFFFF"
            name="xmark.circle.fill"
          />
        </TouchableOpacity>
      </BlurView>
      <View style={styles.scanOverlay}>
        <View style={styles.scanFrame}>
          <View style={styles.scanTextContainer}>
            <Text style={styles.scanText}>Position barcode in frame to scan</Text>
          </View>
        </View>
      </View>
    </CameraView>
  )
}

export default CameraViewWrapper


const styles = StyleSheet.create({
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
  camera: {
    flex: 1,
    width: '100%',
  },
  scanOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },
  scanFrame: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    position: 'relative',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  scanTextContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
})