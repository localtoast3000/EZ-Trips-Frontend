import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText } from 'react-native-paper';

export default function Input({
  name,
  control,
  error,
  helperText,
  rules,
  wrapperStyle,
  defaultStyleOverides = { theme: { colors: { error: 'red' } } },
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) => {
        return (
          <View style={wrapperStyle}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error}
              {...props}
              {...defaultStyleOverides}
            />
            <HelperText type='error' style={{ color: defaultStyleOverides.theme.colors.error }} visible={error}>
              {helperText}
            </HelperText>
          </View>
        );
      }}
    />
  );
}
