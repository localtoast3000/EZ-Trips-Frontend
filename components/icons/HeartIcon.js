import Svg, { Path } from 'react-native-svg'


export default function HeartIcon({ scale, stroke, color, onPress }) {
    return (

        <Svg onPress={onPress} xmlns="http://www.w3.org/2000/svg" width={70*scale} height={70*scale} viewBox="0 0 70 70" fill="none">
        <Path d="M60.7834 13.4458C59.2936 11.9554 57.5249 10.7731 55.5781 9.96645C53.6314 9.15981 51.5448 8.74463 49.4375 8.74463C47.3303 8.74463 45.2437 9.15981 43.2969 9.96645C41.3501 10.7731 39.5814 11.9554 38.0917 13.4458L35 16.5375L31.9084 13.4458C28.8993 10.4367 24.818 8.74619 20.5625 8.74619C16.307 8.74619 12.2258 10.4367 9.21669 13.4458C6.20759 16.4549 4.51709 20.5361 4.51709 24.7916C4.51709 29.0471 6.20759 33.1284 9.21669 36.1375L12.3084 39.2291L35 61.9208L57.6917 39.2291L60.7834 36.1375C62.2738 34.6477 63.456 32.879 64.2627 30.9322C65.0693 28.9855 65.4845 26.8989 65.4845 24.7916C65.4845 22.6844 65.0693 20.5978 64.2627 18.651C63.456 16.7042 62.2738 14.9355 60.7834 13.4458V13.4458Z" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>

    )
}