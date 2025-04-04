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
import * as Yup from 'yup';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  notes: Yup.string(),
  backgroundColor: Yup.string().required(),
});

const AddCartForm = () => {
  const scheme = useColorScheme() || 'light';
  const colors = Colors[scheme];
  const [currentCode, setCurrentCode] = useState(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Formik
        initialValues={{
          name: '',
          notes: '',
          backgroundColor: '#FFFFFF',
          isGradient: false,
          gradientColors: ['#FFFFFF', '#FFFFFF'],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <>
            <ScrollView style={styles.formScroll}>
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Name</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    {
                      borderColor: colors.icon,
                      color: colors.text,
                      backgroundColor: scheme === 'dark' ? '#1E1E1E' : '#fff',
                    },
                  ]}
                  placeholder="Enter a name for this code"
                  placeholderTextColor={scheme === 'dark' ? '#888' : '#aaa'}
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.text }]}>Notes</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    {
                      borderColor: colors.icon,
                      color: colors.text,
                      backgroundColor: scheme === 'dark' ? '#1E1E1E' : '#fff',
                    },
                  ]}
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
                  {colorOptions.map((color) => {
                    const isSelected = values.backgroundColor === color.value;
                    const colorStyle = {
                      backgroundColor: color.value,
                      ...(isSelected && {
                        borderWidth: 2,
                        borderColor: scheme === 'dark' ? '#fff' : '#000',
                      }),
                    };

                    return (
                      <TouchableOpacity
                        key={color.value}
                        style={[styles.colorOption, colorStyle]}
                        onPress={() => setFieldValue('backgroundColor', color.value)}
                      />
                    );
                  })}
                </View>
              </View>

              <View
                style={[
                  styles.barcodeWrapper,
                  {
                    backgroundColor: values.backgroundColor,
                    shadowColor: colors.shadow,
                  },
                ]}
              >
                <Barcode
                  value="3000003062224"
                  options={{
                    format: 'ean13',
                    background: '#FFFFFF',
                  }}
                />
              </View>
            </ScrollView>

            <View style={styles.formFooter}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  {
                    backgroundColor:
                      scheme === 'dark' ? '#fff' : '#000',
                  },
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
    </View>
  );
};

export default AddCartForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formScroll: {
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
  },
  barcodeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
});
