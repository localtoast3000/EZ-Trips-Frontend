import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default function FadeText({ style, isVisible, text, speed }) {
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

  return <Animated.Text style={[style, { opacity: ref.current }]}>{text}</Animated.Text>;
}
