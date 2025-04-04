import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colorOptions } from '@/components/ModalScanner/modalScannerServices';

type Props = {
  selectedColor: string | string[];
  onSelect: (color: string | string[]) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const ColorPicker: React.FC<Props> = ({ selectedColor, onSelect, containerStyle }) => {
  const scheme = useColorScheme() || 'light';

  return (
    <View style={[styles.container, containerStyle]}>
      {colorOptions.map((option, index) => {
        const isSelected =
          option.type === 'color'
            ? selectedColor === option.value
            : JSON.stringify(selectedColor) === JSON.stringify(option.value);

        const border = isSelected
          ? {
            borderWidth: 2,
            borderColor: scheme === 'dark' ? '#fff' : '#000',
          }
          : {};

        return (
          <TouchableOpacity
            key={index}
            style={[styles.colorOption, border]}
            onPress={() => onSelect(option.value)}
          >
            {option.type === 'gradient' ? (
              <LinearGradient
                colors={option.value}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: option.value,
                  borderRadius: 8,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ColorPicker;
