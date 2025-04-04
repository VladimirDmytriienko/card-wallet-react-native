import { createContext, useContext } from 'react';
import { ScannedCode } from './ModalScanner/modalScannerServices';

export type ModalContextType = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  code: ScannedCode 
  setCode: (value: ScannedCode) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalScanner = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalScanner Error');
  }
  return context;
};
