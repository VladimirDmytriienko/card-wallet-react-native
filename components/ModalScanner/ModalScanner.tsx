import React, { useState } from 'react';
import { Modal, View } from 'react-native'
import CameraViewWrapper from './CameraViewWrapper/CameraViewWrapper';
import AddCartForm from './AddCartForm/AddCartForm';
import { useFocusEffect } from 'expo-router';
import { ModalContext } from './ModalScannerContext';
import { ScannedCode } from './modalScannerServices';
import { useRouter } from 'expo-router';

export const boldCode = {
  data: '',
  type: '',
  timestamp: new Date(),
}

const ModalScanner = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(true)
  useFocusEffect(() => {
    setVisible(true)
  })
  const [code, setCode] = useState<ScannedCode>(boldCode)
  return (
    <ModalContext.Provider value={{ visible, setVisible, code, setCode }}>
      <View>
        <Modal
          visible={visible}
          animationType="slide"
          presentationStyle="formSheet"
          onRequestClose={() => {
            setVisible(false)
            router.back()
          }}
        >
          {code.data ? <AddCartForm /> : <CameraViewWrapper />}
        </Modal>
      </View>
    </ModalContext.Provider >
  )
}

export default ModalScanner