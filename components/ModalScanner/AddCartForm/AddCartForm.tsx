import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Barcode } from 'expo-barcode-generator';
import { Formik } from 'formik';
import { Colors } from '@/constants/Colors';
import { validationSchema } from '@/components/ModalScanner/modalScannerServices';
import { useModalScanner } from '@/components/ModalScanner/ModalScannerContext';
import BarcodeWrapper from './BarcodeWrapper';
import ColorPicker from './ColorPicker';
import ModalHeader from '../ModalHeader/ModalHeader';
import { useCards } from '@/react-query/useCards';
import { router } from 'expo-router';

const AddCartForm = () => {
  const { addCard } = useCards()
  const { visible, setVisible, setCode, code } = useModalScanner()

  const scheme = useColorScheme() || 'light';
  const colors = Colors[scheme];
  const inputStyle = [
    styles.formInput,
    {
      borderColor: colors.icon,
      color: colors.text,
      backgroundColor: scheme === 'dark' ? '#1E1E1E' : '#fff',
    },
  ];
  type Card = {
    data: string;
    type: string;
    timestamp: Date;
    name?: string;
    notes?: string;
    backgroundColor?: string;
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ModalHeader title='Add name of a card' position='relative' />
      <Formik
        initialValues={{
          data: code.data,
          type: code.type,
          timestamp: new Date(),
          name: '',
          notes: '',
          backgroundColor: '#FFFFFF',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          addCard(values)
          setVisible(false)
          router.navigate('/explore')
        }
        }
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <>
            <ScrollView style={styles.formScroll}>
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Name</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="Enter a name for this code"
                  placeholderTextColor={scheme === 'dark' ? '#888' : '#aaa'}
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Notes</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="Add any notes (optional)"
                  placeholderTextColor={scheme === 'dark' ? '#888' : '#aaa'}
                  value={values.notes}
                  onChangeText={handleChange('notes')}
                  multiline
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Background Color</Text>
                <View style={styles.colorPickerContainer}>
                  <ColorPicker
                    selectedColor={values.backgroundColor}
                    onSelect={(color) => setFieldValue('backgroundColor', color)}
                    containerStyle={styles.colorPickerContainer}
                  />
                </View>
              </View>
              <BarcodeWrapper backgroundColor={values.backgroundColor} shadowColor={colors.shadow}>
                {!!code.data && code.type ? (
                  <Barcode
                    value={code.data}
                    options={{
                      format: code.type,
                      background: '#FFFFFF',
                    }}
                  />
                ) : null}
              </BarcodeWrapper >

            </ScrollView>

            <View style={styles.formFooter}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  { backgroundColor: scheme === 'dark' ? '#fff' : '#000' },
                ]}
                onPress={() => handleSubmit()}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: scheme === 'dark' ? '#000' : '#fff' },
                  ]}
                >
                  Save Code
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View >
  );
};

export default AddCartForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formScroll: {
    paddingTop: 70,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  formFooter: {
    padding: 20,
  },
  saveButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
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
