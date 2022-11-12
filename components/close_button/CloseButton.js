import Svg, { Rect } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

export default function CloseButton({ style, iconStyle, onPress, iconScale, iconColor, activeOpacity }) {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={activeOpacity}>
      <CrossIcon style={iconStyle} scale={iconScale} color={iconColor} />
    </TouchableOpacity>
  );
}

function CrossIcon({ style, scale = 1, color }) {
  scale = scale < 0.1 ? 1 : scale;
  return (
    <Svg width={38 * scale} height={38 * scale} style={style} viewBox='0 0 38 38'>
      <Rect
        width='8'
        height='44.7235'
        rx='4'
        transform='matrix(0.707025 0.707188 -0.707025 0.707188 31.6206 0.121063)'
        fill={color}
      />
      <Rect
        width='8'
        height='44.7235'
        rx='4'
        transform='matrix(0.707188 -0.707025 0.707188 0.707025 1.52588e-05 5.65619)'
        fill={color}
      />
    </Svg>
  );
}
