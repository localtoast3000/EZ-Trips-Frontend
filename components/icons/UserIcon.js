import Svg, { Path } from 'react-native-svg'


export default function UserIcon({ scale, stroke, color, onPress }) {

    return (

        <Svg onPress={onPress} xmlns="http://www.w3.org/2000/svg" width={70 * scale} height={70 * scale} viewBox="0 0 70 70" >
            <Path d="M58.3332 61.25V55.4167C58.3332 52.3225 57.104 49.355 54.9161 47.1671C52.7282 44.9792 49.7607 43.75 46.6665 43.75H23.3332C20.239 43.75 17.2715 44.9792 15.0836 47.1671C12.8957 49.355 11.6665 52.3225 11.6665 55.4167V61.25" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M35.0002 32.0833C41.4435 32.0833 46.6668 26.86 46.6668 20.4167C46.6668 13.9733 41.4435 8.75 35.0002 8.75C28.5568 8.75 23.3335 13.9733 23.3335 20.4167C23.3335 26.86 28.5568 32.0833 35.0002 32.0833Z" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>

    )
}

