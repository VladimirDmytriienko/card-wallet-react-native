import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
  BarcodeType,
} from 'expo-camera';
import { BlurView } from 'expo-blur';
import { ScannedCode, SUPPORTED_BARCODE_TYPES, normalizeBarcodeType } from '../modalScannerServices';
import { useState } from 'react';
import { useModalScanner } from '@/components/ModalScanner/ModalScannerContext';
import ModalHeader from '../ModalHeader/ModalHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CameraViewWrapper = () => {
  const { visible, setVisible, setCode, code } = useModalScanner();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBarcodeScanned = async ({ data, type }: BarcodeScanningResult) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const normalizedType = normalizeBarcodeType(type);
    const newCode: ScannedCode = {
      data,
      type: normalizedType,
      timestamp: new Date(),
    }
    console.log(normalizedType);

    if (type === 'qr') return
    setCode(newCode);
    setTimeout(() => setIsProcessing(false), 500);
  };

  return (
    <CameraView
      style={styles.camera}
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: SUPPORTED_BARCODE_TYPES as BarcodeType[],
      }}
      onBarcodeScanned={handleBarcodeScanned}
    >
      <ModalHeader title="Scan your code" />
      <View style={styles.scanOverlay}>
        <BlurView intensity={30} tint="dark" style={styles.scanFrame}>
          <MaterialCommunityIcons name="barcode-scan" size={64} color="#fff" />
        </BlurView>
        <Text style={styles.scanText}>Align the barcode within the frame</Text>
      </View>
    </CameraView>
  );
};

export default CameraViewWrapper;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  scanFrame: {
    width: '100%',
    aspectRatio: 2.5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 24,
  },
  scanText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
  },
});
