import { useFonts } from 'expo-font';

const fontsList = {
  heading: require('./MeganDemo.otf'),
  txt: require('./poppins/Poppins-Regular.ttf'),
  txtLight: require('./poppins/Poppins-Light.ttf'),
  txtItalic: require('./poppins/Poppins-Italic.ttf'),
  txtMedium: require('./poppins/Poppins-Medium.ttf'),
  txtBold: require('./poppins/Poppins-Bold.ttf'),
  txtExtraBold: require('./poppins/Poppins-ExtraBold.ttf'),
  txtBlack: require('./poppins/Poppins-Black.ttf'),
  txtExtraLight: require('./poppins/Poppins-ExtraLight.ttf'),
};

export function loadFonts() {
  const [fonts] = useFonts(fontsList);
  return fonts;
}
