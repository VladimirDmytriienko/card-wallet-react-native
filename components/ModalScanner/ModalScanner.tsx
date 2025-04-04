import { Modal, View } from 'react-native'
import CameraViewWrapper from './CameraViewWrapper/CameraViewWrapper';
import AddCartForm from './AddCartForm/AddCartForm';
import React, { useState } from 'react';
import { ModalContext } from '../ModalScannerContext';
import { ScannedCode } from './modalScannerServices';
import { useRouter } from 'expo-router';

export const boldCode = {
  data: '',
  type: '',
  timestamp: new Date(),
}

const ModalScanner = () => {
  const { navigate } = useRouter();
  const [visible, setVisible] = useState(true);
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
            navigate('/card-list')
          }}
        >
          {code.data ? <AddCartForm /> : <CameraViewWrapper />}
        </Modal>
      </View>
    </ModalContext.Provider >
  )
}

export default ModalScanner