import { View } from 'react-native';
import { Video } from 'expo-av';
import { Dimensions } from 'react-native';
import { useEffect } from 'react';

export default function VideoBackground({ source, layerOpacity, children }) {
  useEffect(() => {
    console.log('Hello');
  }, []);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Video
        source={source}
        style={{ left: 0, right: 0, bottom: 0, height: Dimensions.get('window').height + 70 }}
        useNativeControls={false}
        resizeMode='cover'
        isLooping
        shouldPlay
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
          opacity: layerOpacity,
        }}></View>
      {children({ position: 'absolute', flex: 1, top: 0, left: 0, bottom: 0, right: 0 })}
    </View>
  );
}
