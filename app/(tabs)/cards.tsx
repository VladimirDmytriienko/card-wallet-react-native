import ParallaxScrollView from '@/components/ParallaxScrollView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { BlurView } from 'expo-blur';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { useState } from 'react';
import { Barcode } from 'expo-barcode-generator';
const SUPPORTED_BARCODE_TYPES: BarcodeType[] = [
  'aztec',
  'ean13',
  'ean8',
  'qr',
  'pdf417',
  'upc_e',
  'datamatrix',
  'code39',
  'code93',
  'itf14',
  'codabar',
  'code128',
  'upc_a'
];

interface ScannedCode {
  data: string;
  type: string;
  timestamp: Date;
}

const Cards = () => {
  const [camera, setCamera] = useState(false)
  const [scannedCodes, setScannedCodes] = useState<ScannedCode[]>([])
  const [permission, requestPermission] = useCameraPermissions()
  const [isProcessing, setIsProcessing] = useState(false);
  const handleCamera = () => setCamera((prev) => !prev)

  const normalizeBarcodeType = (type) => {
    const barcodeTypeMapping = {
      "org.iso.Code39": "code39",
      "org.gs1.EAN-13": "ean13",
      "org.gs1.EAN-8": "ean8",
      "org.iso.Code128": "code128",
      "org.iso.Code93": "code93",
      "org.iso.ITF14": "itf14",
      "org.iso.PDF417": "pdf417",
      "org.iso.QRCode": "qr",
      "org.gs1.UPC-A": "upc_a",
      "org.gs1.UPC-E": "upc_e",
      "org.iso.DataMatrix": "datamatrix",
      "org.ansi.Codabar": "codabar",
    };

    return barcodeTypeMapping[type] || type
  };

  const handleBarcodeScanned = async ({ data, type }: BarcodeScanningResult) => {
    if (isProcessing || scannedCodes.some(code => code.data === data)) return
    setIsProcessing(true)
    setCamera(false)
    const normalizedType = normalizeBarcodeType(type)
    const newCode: ScannedCode = {
      data,
      type: normalizedType,
      timestamp: new Date(),
    }
    setScannedCodes(prev => [...prev, newCode])
    setTimeout(() => setIsProcessing(false), 500)
  }


  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="creditcard.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cards</ThemedText>
        <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
          <IconSymbol
            size={24}
            color="#FFFFFF"
            name="camera.fill"
          />
        </TouchableOpacity>
      </ThemedView>
      <ThemedText>This page shows your cards </ThemedText>

      {scannedCodes.length > 0 ? (
        <ThemedView style={styles.scannedCodesContainer}>
          {scannedCodes.map((code, index) => (
            <View key={index} style={styles.codeCollapsible}>
              <Collapsible title={`Code ${index + 1}`}>
                <ThemedView style={styles.codeDetails}>
                  <Barcode
                    value={code.data}
                    options={{
                      format: code.type,
                      background: 'lightblue'
                    }}
                    rotation={-5}
                  />
                  <ThemedText style={styles.codeLabel}>Data:</ThemedText>
                  <ThemedText style={styles.codeValue}>{code.data}</ThemedText>

                  <ThemedText style={styles.codeLabel}>Type:</ThemedText>
                  <ThemedText style={styles.codeValue}>{code.type}</ThemedText>

                  <ThemedText style={styles.codeLabel}>Scanned:</ThemedText>
                  <ThemedText style={styles.codeValue}>
                    {code.timestamp.toLocaleString()}
                  </ThemedText>
                </ThemedView>
              </Collapsible>
            </View>
          ))}
        </ThemedView>
      ) : (
        <ThemedText style={styles.noCodesText}>No codes scanned yet</ThemedText>
      )}

      <Modal
        visible={camera}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <SafeAreaView style={styles.container}>
          <BlurView intensity={50} style={styles.header}>
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
            <Text style={styles.headerTitle}>Scan your code</Text>
          </BlurView>

          <CameraView
            style={styles.camera}
            facing={'back'}
            barcodeScannerSettings={{
              barcodeTypes: SUPPORTED_BARCODE_TYPES,
            }}
            onBarcodeScanned={handleBarcodeScanned}
          >
            <View style={styles.scanOverlay}>
              <Text style={styles.scanText}>Position barcode in frame to scan</Text>
            </View>
          </CameraView>
        </SafeAreaView>
      </Modal>
    </ParallaxScrollView>
  )
}

export default Cards

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
    opacity: 0.8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cameraButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
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
  scanText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scannedCodesContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  codeCollapsible: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  codeDetails: {
    padding: 16,
    gap: 8,
  },
  codeLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  codeValue: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  noCodesText: {
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.7,
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
    lineHeight: 24,
    fontWeight: '500',
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
