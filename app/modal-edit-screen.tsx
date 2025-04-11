import { useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import AddCartForm from '@/components/ModalScanner/AddCartForm/AddCartForm';
import { ModalContext } from '@/components/ModalScanner/ModalScannerContext';
import { boldCode } from '@/components/ModalScanner/ModalScanner';
import { ScannedCode } from '@/components/ModalScanner/modalScannerServices';
interface ParamsOptions {
  title: string;
  color: string;
  code: string;
  type: string;
}

export default function Modal() {
  const [visible, setVisible] = useState<boolean>(true)
  const [code, setCode] = useState<ScannedCode>(boldCode)
  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      <ModalContext.Provider value={{ visible, setVisible, code, setCode }}>
        <AddCartForm />
      </ModalContext.Provider >
    </Animated.View>
  );
}

