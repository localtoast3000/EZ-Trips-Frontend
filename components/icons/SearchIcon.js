// import Svg, { Path } from 'react-native-svg'

// export default function SearchIcon({scale, stroke, color, onPress}) {
//     return (
//         <Svg onPress={onPress} xmlns="http://www.w3.org/2000/svg" width={70*scale} height={70*scale} viewBox="0 0 70 70" fill="none">
// <Path d="M32.0833 55.4167C44.97 55.4167 55.4167 44.97 55.4167 32.0833C55.4167 19.1967 44.97 8.75 32.0833 8.75C19.1967 8.75 8.75 19.1967 8.75 32.0833C8.75 44.97 19.1967 55.4167 32.0833 55.4167Z" stroke="black" stroke-width={2*stroke} stroke-linecap="round" stroke-linejoin="round"/>
// <Path d="M61.25 61.25L48.5625 48.5625" stroke="black" stroke-width={2*stroke} stroke-linecap="round" stroke-linejoin="round"/>
// </Svg>
//     )
// }

import Svg, { Path } from 'react-native-svg'

export default function SearchIcon({ scale, stroke, color, onPress }) {
    return (
<Svg onPress={onPress} xmlns="http://www.w3.org/2000/svg" width={70*scale} height={70*scale} viewBox="0 0 70 70" fill="none">
<Path d="M32.0833 55.4167C44.97 55.4167 55.4167 44.97 55.4167 32.0833C55.4167 19.1967 44.97 8.75 32.0833 8.75C19.1967 8.75 8.75 19.1967 8.75 32.0833C8.75 44.97 19.1967 55.4167 32.0833 55.4167Z" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M61.25 61.25L48.5625 48.5625" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>

    )
}