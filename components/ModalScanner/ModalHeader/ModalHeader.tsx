import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useModalScanner } from '@/components/ModalScanner/ModalScannerContext';
import { boldCode } from '../ModalScanner';
import { useRouter } from 'expo-router';
interface ModalHeaderProps {
  title: string;
  position?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, position }) => {
  const { setVisible, setCode } = useModalScanner()
  const router = useRouter();
  return (
    <BlurView intensity={20} style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={(handleCamera) => {
          setVisible(false)
          setCode(boldCode)
          router.replace('/')
        }}
      >
        <IconSymbol
          size={24}
          color="#FFFFFF"
          name="xmark.circle.fill"
        />
      </TouchableOpacity>
    </BlurView>
  )
}

export default ModalHeader

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
    paddingVertical: 8,
    borderBottomWidth: 0,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
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
  }
})