import { Animated, View } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useEffect, useRef } from 'react';

// The progress bar for the on boarding screen
export default function ProgressBar({ slideQty, currentSlide, animationSpeed }) {
  const width = 300;
  const { theme } = useTheme();
  const { onBoarding } = useTheme();
  let previousRef = useRef(new Animated.Value((width / slideQty) * currentSlide));
  let currentRef = useRef(new Animated.Value((width / slideQty) * currentSlide));

  useEffect(() => {
    previousRef.current = currentRef.current;
  }, [currentRef.current]);

  useEffect(() => {
    transition();
  }, [currentSlide]);

  const transition = () => {
    Animated.timing(previousRef.current, {
      toValue: (width / slideQty) * currentSlide,
      duration: animationSpeed,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.barBg, backgroundColor: onBoarding.progressBarBg, width: width }}>
        <Animated.View
          style={[
            {
              ...styles.barPos,
              backgroundColor: onBoarding.progressBarPos,
            },
            { width: currentRef.current },
          ]}></Animated.View>
      </View>
    </View>
  );
}
