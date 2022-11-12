import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default function FadeContainer({ style, isVisible, onLayout, speed, children }) {
  let ref = useRef(new Animated.Value(1));

  useEffect(() => {
    isVisible ? fadeIn() : fadeOut();
  }, [isVisible]);

  const fadeOut = () => {
    Animated.timing(ref.current, {
      toValue: 0,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(ref.current, {
      toValue: 1,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View onLayout={onLayout} style={[style, { opacity: ref.current }]}>
      {children}
    </Animated.View>
  );
}
