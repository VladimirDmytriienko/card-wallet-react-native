/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

interface ColorScheme {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  glass: string;
  glassDark: string;
  shadow: string;
}

export const Colors: { light: ColorScheme; dark: ColorScheme } = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    glass: 'rgba(255, 255, 255, 0.8)',
    glassDark: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    glass: 'rgba(28, 28, 30, 0.8)',
    glassDark: 'rgba(255, 255, 255, 0.05)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};
