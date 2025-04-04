import { Modal, Text, View } from 'react-native'
import CameraViewWrapper from './CameraViewWrapper/CameraViewWrapper';
import AddCartForm from './AddCartForm/AddCartForm';


const ModalScanner = () => {
  const camera = true
  const currentCode = null
  return (
    <View>
      <Modal
        visible={camera}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <AddCartForm />
        {/* {currentCode ? (
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
          <CameraViewWrapper />
        )} */}
      </Modal>
    </View >
  )
}

export default ModalScanner