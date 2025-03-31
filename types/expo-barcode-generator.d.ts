declare module 'expo-barcode-generator' {
  import { ViewProps } from 'react-native';

  interface BarcodeOptions {
    format: string;
    background?: string;
    foreground?: string;
    rotation?: number;
  }

  interface BarcodeProps extends ViewProps {
    value: string;
    options?: BarcodeOptions;
  }

  export const Barcode: React.FC<BarcodeProps>;
} 