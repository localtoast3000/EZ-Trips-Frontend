import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ScrollView, Text } from 'react-native';
import { useState } from 'react';

/*
  overides={{
            trackStyle: {},
            selectedStyle: {},
            unselectedStyle: {},
            markerContainerStyle: {},
            markerStyle: {},
            pressedMarkerStyle: {},
          }}
  */

export default function HorizontalDoubleRangeSlider({
  min = 0,
  max = 100,
  step = 10,
  length = 200,
  touchDimensions = { height: 50, width: 50 },
  overides,
  minDistance = 50,
  onValuesChange = () => null,
  onSlidingStart = () => null,
  onSlidingEnd = () => null,
  onSlidingComplete = () => null,
}) {
  const [rangeSliding, setRangeSliding] = useState(false);

  return (
    <ScrollView scrollEnabled={rangeSliding}>
      <MultiSlider
        containerStyle={{ paddingHorizontal: 20 }}
        values={[min, max]}
        min={min}
        max={max}
        step={step}
        sliderLength={length}
        minMarkerOverlapDistance={minDistance}
        onValuesChangeStart={() => setRangeSliding(true)}
        onValuesChangeFinish={() => setRangeSliding(false)}
        onValuesChange={(value) => onValuesChange(value)}
        onSlidingStart={onSlidingStart}
        onSlidingEnd={onSlidingEnd}
        onSlidingComplete={onSlidingComplete}
        touchDimensions={touchDimensions}
        enabledTwo={true}
        enabledOne={true}
        {...overides}
      />
    </ScrollView>
  );
}
