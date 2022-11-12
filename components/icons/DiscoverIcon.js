import Svg, { Path } from 'react-native-svg'


export default function DiscoverIcon({ scale, stroke, color, onPress }) {
    return (

        <Svg onPress={onPress} xmlns="http://www.w3.org/2000/svg" width={scale*70} height={scale*70} viewBox="0 0 70 70" fill="none">
<Path d="M35.0002 64.1668C51.1085 64.1668 64.1668 51.1085 64.1668 35.0002C64.1668 18.8919 51.1085 5.8335 35.0002 5.8335C18.8919 5.8335 5.8335 18.8919 5.8335 35.0002C5.8335 51.1085 18.8919 64.1668 35.0002 64.1668Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M47.3666 22.6333L41.1833 41.1833L22.6333 47.3666L28.8166 28.8166L47.3666 22.6333Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
</Svg>

    )
}