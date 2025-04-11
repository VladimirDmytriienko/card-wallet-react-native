import CameraPermission from '@/components/CameraPermission/CameraPermission';
import ModalScanner from '@/components/ModalScanner/ModalScanner';
import { View } from 'react-native'

export default function ModalScannerPage() {


  return (
    <View >
      <CameraPermission />
      <ModalScanner />

    </View>
  );
}

