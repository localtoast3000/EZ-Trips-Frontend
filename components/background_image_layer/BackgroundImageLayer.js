import { View, Image } from 'react-native';
import { Dimensions } from 'react-native';

export default function BackgroundImageLayer({ source, layerOpacity, style, children }) {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Image
        source={source}
        style={{ left: 0, right: 0, bottom: 0, height: Dimensions.get('window').height, ...style }}
        resizeMode='cover'
      />
      <View
        style={{
          position: 'absolute',
          flex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          zIndex: 1,
          opacity: layerOpacity,
          ...style,
        }}></View>
      {children ? children({ position: 'absolute', flex: 1, top: 0, left: 0, bottom: 0, right: 0, zIndex: 2 }) : <></>}
    </View>
  );
}
