import { Animated, PanResponder } from 'react-native';
import { useEffect, useState, useRef } from 'react';

// Returns
export default function SwipeContainer({ style, onSwipe, deadzone = 0, children }) {
  const [direction, setDirection] = useState({ direction: false });
  const panStart = useRef(new Animated.ValueXY()).current;
  const panEnd = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (!direction.direction) return;
    onSwipe({ direction });
  }, [direction]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart: Animated.event([null, { x0: panStart.x, y0: panStart.y }], { useNativeDriver: false }),
      onPanResponderGrant: (e) => {
        panEnd.setOffset({
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
        });
      },
      onPanResponderMove: Animated.event([null, { moveX: panEnd.x, moveY: panEnd.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        setDirection({ direction: calculateDirection(panStart, panEnd, deadzone) });
        panStart.setOffset({
          x: 0,
          y: 0,
        });
        panStart.flattenOffset();
        panEnd.setOffset({
          x: 0,
          y: 0,
        });
        panEnd.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View {...panResponder.panHandlers} style={style}>
      {children}
    </Animated.View>
  );
}

// s preffix = start position
// e preffix = end position
function calculateDirection(start, end, deadzone) {
  const sx = start.x._value;
  const sy = start.y._value;
  const ex = end.x._value;
  const ey = end.y._value;
  const xDiff = Math.abs(sx - ex);
  const yDiff = Math.abs(sy - ey);

  if (xDiff > yDiff) {
    if (sx > ex) return 'left';
    if (sx < ex) return 'right';
  } else {
    if (sy > ey) return 'up';
    if (sy < ey) return 'down';
  }
}
