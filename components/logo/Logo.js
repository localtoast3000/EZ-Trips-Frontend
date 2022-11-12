import { View, Text } from 'react-native';

export default function Logo({ containerStyles, color, size }) {
  return (
    <View style={containerStyles}>
      <Text style={{ fontFamily: 'heading', color, fontSize: size }}>EZ</Text>
      <Text style={{ fontFamily: 'heading', color, fontSize: size }}>TRIPS</Text>
    </View>
  );
}
