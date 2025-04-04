import { BarcodeType } from 'expo-camera';
import * as Yup from 'yup';
export const SUPPORTED_BARCODE_TYPES: BarcodeType[] = [
  'aztec',
  'ean13',
  'ean8',
  'qr',
  'pdf417',
  'upc_e',
  'datamatrix',
  'code39',
  'code93',
  'itf14',
  'codabar',
  'code128',
  'upc_a'
];
type GradientOption = {
  label: string;
  type: 'gradient';
  value: [string, string, ...string[]]; 
}

type SolidColorOption = {
  label: string;
  value: string;
  type?: 'color';
}
export type ColorOption = SolidColorOption | GradientOption;

export const colorOptions: ReadonlyArray<ColorOption> = [
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
  { label: 'Sunset Gradient', type: 'gradient', value: ['#FF5F6D', '#FFC371'] },
  { label: 'Sky Gradient', type: 'gradient', value: ['#36D1DC', '#5B86E5'] },
  { label: 'Purple Dream', type: 'gradient', value: ['#DA22FF', '#9733EE'] },
  { label: 'Peachy', type: 'gradient', value: ['#FFD194', '#D1913C'] },
  { label: 'Ocean Deep', type: 'gradient', value: ['#2c3e50', '#4ca1af'] },
  { label: 'Lush Forest', type: 'gradient', value: ['#134E5E', '#71B280'] },
  { label: 'Fiery Sunset', type: 'gradient', value: ['#ee0979', '#ff6a00'] },
  { label: 'Nebula', type: 'gradient', value: ['#6a11cb', '#2575fc'] },
  { label: 'Morning Sky', type: 'gradient', value: ['#a1c4fd', '#c2e9fb'] },
  { label: 'Golden Hour', type: 'gradient', value: ['#F2C94C', '#F2994A'] },
  { label: 'Synthwave Pop', type: 'gradient', value: ['#f09', '#43cea2'] },
  { label: 'Pastel Dream', type: 'gradient', value: ['#fbc2eb', '#a6c1ee'] },
  { label: 'Emerald Water', type: 'gradient', value: ['#348F50', '#56B4D3'] },
  { label: 'Ruby Wine', type: 'gradient', value: ['#D31027', '#EA384D'] },
  { label: 'Cosmic Fusion', type: 'gradient', value: ['#ff00cc', '#333399'] },
  { label: 'Mango Delight (3-stop)', type: 'gradient', value: ['#ffe259', '#ffa751', '#ff7b00'] },
  { label: 'Arctic Aurora (3-stop)', type: 'gradient', value: ['#7F7FD5', '#86A8E7', '#91EAE4'] },
]

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  notes: Yup.string(),
  backgroundColor: Yup.mixed().required(),
});
export type BackgroundColorType = string | [string, string, ...string[]];


export const normalizeBarcodeType = (type: string): string => {
  const barcodeTypeMapping: Record<string, string> = {
    "org.iso.Code39": "code39",
    "org.gs1.EAN-13": "ean13",
    "org.gs1.EAN-8": "ean8",
    "org.iso.Code128": "code128",
    "org.iso.Code93": "code93",
    "org.iso.ITF14": "itf14",
    "org.iso.PDF417": "pdf417",
    "org.iso.QRCode": "qr",
    "org.gs1.UPC-A": "upc_a",
    "org.gs1.UPC-E": "upc_e",
    "org.iso.DataMatrix": "datamatrix",
    "org.ansi.Codabar": "codabar",
  };

  return barcodeTypeMapping[type] || type;
}
export interface ScannedCode {
  data: string;
  type: string;
  timestamp: Date;
  name?: string;
  notes?: string;
  backgroundColor?: string;
}
