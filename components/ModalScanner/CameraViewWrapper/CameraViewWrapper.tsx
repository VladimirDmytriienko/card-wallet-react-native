import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult, BarcodeType } from 'expo-camera'; 'expo-blur';
import { ScannedCode, SUPPORTED_BARCODE_TYPES, normalizeBarcodeType } from '../modalScannerServices';
import { useState } from 'react';
import { useModalScanner } from '@/components/ModalScanner/ModalScannerContext';
import ModalHeader from '../ModalHeader/ModalHeader';

const CameraViewWrapper = () => {
  const { visible, setVisible, setCode, code } = useModalScanner()
  const [isProcessing, setIsProcessing] = useState(false);
  const handleBarcodeScanned = async ({ data, type }: BarcodeScanningResult) => {
    if (isProcessing) return
    setIsProcessing(true);
    const normalizedType = normalizeBarcodeType(type);
    const newCode: ScannedCode = {
      data,
      type: normalizedType,
      timestamp: new Date(),
    };
    setCode(newCode);
    setTimeout(() => setIsProcessing(false), 500);
  };

  return (
    <CameraView
      style={styles.camera}
      facing={'back'}
      barcodeScannerSettings={{
        barcodeTypes: SUPPORTED_BARCODE_TYPES as BarcodeType[],
      }}
      onBarcodeScanned={handleBarcodeScanned}
    >
      <ModalHeader title='Scan your code' />
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