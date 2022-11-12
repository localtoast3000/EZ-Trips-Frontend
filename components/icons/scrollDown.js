import Svg, { Path } from 'react-native-svg';

export default function Scroll({ direction = 'down' }) {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' width='18' height='9' viewBox='0 0 18 9' fill='none'>
      <Path
        d='M16.9201 0.950195L10.4001 7.4702C9.63008 8.2402 8.37008 8.2402 7.60008 7.4702L1.08008 0.950195'
        stroke='white'
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
}
