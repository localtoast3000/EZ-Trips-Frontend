import { RangeSlider } from '@sharcoux/slider';

export default function HorizontalRangeSlider({
  min,
  max,
  step,
  minRange,
  overides,
  onValueChange = () => null,
  onSlidingStart = () => null,
  onSlidingComplete = () => null,
}) {
  return (
    <RangeSlider
      range={[min, max]} // set the current slider's value
      minimumValue={min} // Minimum value
      maximumValue={max} // Maximum value
      step={step} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
      minimumRange={minRange} // Minimum range between the two thumbs
      crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
      vertical={false} // If true, the slider will be drawn vertically
      inverted={false} // If true, min value will be on the right, and max on the left
      enabled={true} // If false, the slider won't respond to touches anymore
      slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
      onValueChange={onValueChange} // Called each time the value changed. The type is (range: [number, number]) => void
      onSlidingStart={onSlidingStart} // Called when the slider is pressed. The type is (range: [number, number]) => void
      onSlidingComplete={onSlidingComplete} // Called when the press is released. The type is (range: [number, number]) => void
      {...overides}
    />
  );
}
