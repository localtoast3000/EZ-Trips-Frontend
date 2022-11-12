import { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';

export default function PulsingContainer({ style, isVisible, children, speed }) {
  let ref = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isVisible) {
      fadeIn(1, speed);
      const interval = setInterval(() => {
        if (ref._value === 1) return fadeOut(0, 1500);
        fadeIn(1, 1500);
      }, 1600);
      return () => clearInterval(interval);
    } else {
      fadeOut(0, speed);
    }
  }, [isVisible]);

  const fadeIn = (amount, milliseconds) => {
    Animated.timing(ref, {
      toValue: amount,
      duration: milliseconds,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = (amount, milliseconds) => {
    Animated.timing(ref, {
      toValue: amount,
      duration: milliseconds,
      useNativeDriver: false,
    }).start();
  };

  return <Animated.View style={[style, { opacity: ref }]}>{children}</Animated.View>;
}

async function wait(milliseconds, cb) {
  return new Promise((resolve, reject) =>
    resolve(
      setTimeout(() => cb()),
      milliseconds
    )
  );
}
