import { useState } from 'react';
import { useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { BlurView } from 'expo-blur';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { Barcode } from 'expo-barcode-generator';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';


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
  name?: string;
  notes?: string;
  backgroundColor?: string;
}

interface FormData {
  name: string;
  notes: string;
  backgroundColor: string;
  isGradient: boolean;
  gradientColors: [string, string];
}

const Cards = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const colors = Colors[colorScheme ?? 'light'];
  const [camera, setCamera] = useState(false)
  const [scannedCodes, setScannedCodes] = useState<ScannedCode[]>([])
  const [permission, requestPermission] = useCameraPermissions()
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentCode, setCurrentCode] = useState<ScannedCode | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    notes: '',
    backgroundColor: '#FFFFFF',
    isGradient: false,
    gradientColors: ['#FFFFFF', '#FFFFFF'] as [string, string]
  });
  const handleCamera = () => setCamera((prev) => !prev)

  const colorOptions = [
    { label: 'White', value: '#FFFFFF' },
    { label: 'Black', value: '#000000' },
    { label: 'Gray', value: '#808080' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Sunset', value: '#FF2D55' },
    { label: 'Ocean', value: '#00BCD4' },
    { label: 'Forest', value: '#2ECC71' },
    { label: 'Lavender', value: '#9B59B6' },
    { label: 'Coral', value: '#FF9800' },
    { label: 'Mint', value: '#00E676' },
    { label: 'Sky', value: '#2196F3' },
    { label: 'Peach', value: '#FFC107' },
    { label: 'Rose', value: '#E91E63' },
  ];

  const normalizeBarcodeType = (type: string): string => {
    const barcodeTypeMapping: Record<string, string> = {
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

    return barcodeTypeMapping[type] || type;
  };

  const handleBarcodeScanned = async ({ data, type }: BarcodeScanningResult) => {
    if (isProcessing || scannedCodes.some(code => code.data === data)) return;
    setIsProcessing(true);
    const normalizedType = normalizeBarcodeType(type);
    const newCode: ScannedCode = {
      data,
      type: normalizedType,
      timestamp: new Date(),
    };
    setCurrentCode(newCode);
    setTimeout(() => setIsProcessing(false), 500);
  };

  const handleSaveCode = () => {
    if (currentCode) {
      const updatedCode = {
        ...currentCode,
        name: formData.name,
        notes: formData.notes,
        backgroundColor: formData.backgroundColor,
      }

      setScannedCodes(prev => [...prev, updatedCode])
      handleCamera()
      setCurrentCode(null)
      setFormData({ name: '', notes: '', backgroundColor: '#FFFFFF', isGradient: false, gradientColors: ['#FFFFFF', '#FFFFFF'] as [string, string] })
    }
  };

  if (!permission) {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.text }]}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.permissionContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.text }]}>We need your permission to show the camera</Text>
        <TouchableOpacity
          style={[styles.permissionButton, {
            backgroundColor: colors.tint,
            shadowColor: colors.tint
          }]}
          onPress={requestPermission}
        >
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
                <ThemedView style={[styles.codeDetails, { backgroundColor: code.backgroundColor }]}>
                  <View style={styles.barcodeWrapper}>
                    <Barcode
                      value={code.data}
                      options={{
                        format: code.type,
                        background: '#FFFFFF',
                        rotation: -5
                      }}
                    />
                  </View>
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
        {currentCode ? (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <BlurView intensity={20} style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setCurrentCode(null);
                  setFormData({ name: '', notes: '', backgroundColor: '#FFFFFF', isGradient: false, gradientColors: ['#FFFFFF', '#FFFFFF'] as [string, string] });
                }}
              >
                <IconSymbol
                  size={24}
                  color="#FFFFFF"
                  name="xmark.circle.fill"
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add Scanned Code</Text>
            </BlurView>

            <ScrollView style={styles.formScroll}>
              <View style={styles.formGroup}>
                <Text style={[
                  styles.formLabel,
                  colorScheme === 'light' ? styles.formLabelLight : styles.formLabelDark
                ]}>Code Data</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    colorScheme === 'light' ? styles.formInputLight : styles.formInputDark
                  ]}
                  value={currentCode.data}
                  onChangeText={(text) => setCurrentCode(prev => prev ? { ...prev, data: text } : null)}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[
                  styles.formLabel,
                  colorScheme === 'light' ? styles.formLabelLight : styles.formLabelDark
                ]}>Name</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    colorScheme === 'light' ? styles.formInputLight : styles.formInputDark
                  ]}
                  placeholder="Enter a name for this code"
                  placeholderTextColor={colorScheme === 'light' ? '#666666' : '#999999'}
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[
                  styles.formLabel,
                  colorScheme === 'light' ? styles.formLabelLight : styles.formLabelDark
                ]}>Notes</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    styles.notesInput,
                    colorScheme === 'light' ? styles.formInputLight : styles.formInputDark
                  ]}
                  placeholder="Add any notes (optional)"
                  placeholderTextColor={colorScheme === 'light' ? '#666666' : '#999999'}
                  value={formData.notes}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Background Color</Text>
                <View style={styles.colorPickerContainer}>
                  {colorOptions.map((color) => (
                    <TouchableOpacity
                      key={color.value}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color.value },
                        formData.backgroundColor === color.value && styles.colorOptionSelected
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, backgroundColor: color.value }))}
                    >
                      {formData.backgroundColor === color.value && (
                        <IconSymbol
                          size={20}
                          color="#000000"
                          name="checkmark.circle.fill"
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={[
                  styles.formLabel,
                  colorScheme === 'light' ? styles.formLabelLight : styles.formLabelDark
                ]}>Preview</Text>
                <View style={styles.previewContainer}>
                  {formData.isGradient ? (
                    <LinearGradient
                      colors={formData.gradientColors}
                      style={styles.previewBackground}
                    />
                  ) : (
                    <View style={[
                      styles.previewBackground,
                      { backgroundColor: formData.backgroundColor }
                    ]} />
                  )}
                  <View style={styles.barcodeWrapper}>
                    <Barcode
                      value={currentCode.data}
                      options={{
                        format: currentCode.type,
                        background: '#FFFFFF',
                        rotation: -5
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.formFooter}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  colorScheme === 'light' ? styles.cancelButtonLight : styles.cancelButtonDark
                ]}
                onPress={() => {
                  setCurrentCode(null);
                  setFormData({ name: '', notes: '', backgroundColor: '#FFFFFF', isGradient: false, gradientColors: ['#FFFFFF', '#FFFFFF'] as [string, string] });
                }}
              >
                <Text style={[
                  styles.buttonText,
                  colorScheme === 'light' ? styles.buttonTextLight : styles.buttonTextDark
                ]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.tint }]}
                onPress={handleSaveCode}
              >
                <Text style={styles.buttonText}>Save Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CameraView
            style={styles.camera}
            facing={'back'}
            barcodeScannerSettings={{
              barcodeTypes: SUPPORTED_BARCODE_TYPES,
            }}
            onBarcodeScanned={handleBarcodeScanned}
          >
            <BlurView intensity={20} style={styles.header}>
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
            <View style={styles.scanOverlay}>
              <View style={styles.scanFrame}>
                <View style={styles.scanTextContainer}>
                  <Text style={styles.scanText}>Position barcode in frame to scan</Text>
                </View>
              </View>
            </View>
          </CameraView>
        )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    fontWeight: '500',
  },
  permissionButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
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
  formModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  formModalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  formScroll: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.8,
  },
  formLabelLight: {
    color: '#000000',
  },
  formLabelDark: {
    color: '#FFFFFF',
  },
  formInput: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  formInputLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#000000',
    borderColor: '#000000',
  },
  formInputDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  textInput: {
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  formValue: {
    fontSize: 16,
  },
  formFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cancelButtonDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorOptionSelected: {
    borderColor: '#007AFF',
  },
  previewContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  previewBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  barcodeWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonTextLight: {
    color: '#000000',
  },
  buttonTextDark: {
    color: '#FFFFFF',
  },
});
