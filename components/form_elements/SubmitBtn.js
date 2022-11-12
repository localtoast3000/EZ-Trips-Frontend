import { TouchableOpacity, Text } from 'react-native';

export default function SubmitBtn({ onSubmit, btnStyle, textStyle, text, activeOpacity }) {
  return (
    <TouchableOpacity
      style={{ ...btnStyle, alignItems: 'center', justifyContent: 'center' }}
      onPress={onSubmit()}
      activeOpacity={activeOpacity}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
