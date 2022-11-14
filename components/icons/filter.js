import Svg, { Rect, Circle } from 'react-native-svg';

export default function FilterIcon({ style, scale = 1, color = 'black', onPress }) {
  return (
    <Svg
      style={style}
      onPress={onPress}
      width={scale * 24}
      height={scale * 15}
      viewBox='0 0 24 15'
      fill='none'
    >
      <Rect y='12.1154' width='23.0769' height='1.15385' rx='0.576923' fill={color} />
      <Circle cx='17.8846' cy='12.6923' r='2.30769' fill={color} />
      <Rect y='6.92308' width='23.0769' height='1.15385' rx='0.576923' fill={color} />
      <Circle cx='5.76924' cy='7.5' r='2.30769' fill={color} />
      <Rect y='1.73077' width='23.0769' height='1.15385' rx='0.576923' fill={color} />
      <Circle cx='12.1154' cy='2.30769' r='2.30769' fill={color} />
    </Svg>
  );
}
