import Svg, { Path } from 'react-native-svg';

export default function SwipeArrow({ color = 'white', scale = 1 }) {
  scale = scale < 0.1 ? 1 : scale;
  return (
    <Svg width={57 * scale} height={26 * scale} viewBox='0 0 57 26' fill='none'>
      <Path
        fill={color}
        d='M31 13C31 12.1025 31.7275 11.375 32.625 11.375H50.7762L42.8463 3.44501C42.2097 2.80846 42.2115 1.77587 42.8503 1.14158C43.4859 0.510449 44.5123 0.512263 45.1456 1.14563L55.5858 11.5858C56.3668 12.3668 56.3668 13.6332 55.5858 14.4142L45.1461 24.8539C44.5131 25.4869 43.4869 25.4869 42.8539 24.8539C42.2213 24.2213 42.2208 23.1958 42.8528 22.5626L50.7762 14.625H32.625C31.7275 14.625 31 13.8975 31 13Z'
      />
      <Path d='M14 13L22 13' stroke={color} strokeWidth='3' strokeLinecap='round' />
      <Path d='M2 13H5' stroke={color} strokeWidth='3' strokeLinecap='round' />
    </Svg>
  );
}
