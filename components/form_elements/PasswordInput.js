import { View } from 'react-native';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText } from 'react-native-paper';

export default function PasswordInput({
  name,
  control,
  error,
  helperText,
  rules,
  wrapperStyle,
  iconColor,
  defaultStyleOverides = { theme: { colors: { error: 'red' } } },
  ...props
}) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={wrapperStyle}>
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            right={
              hidePassword ? (
                <TextInput.Icon
                  onPress={() => setHidePassword(false)}
                  name='eye'
                  color={(error && defaultStyleOverides.theme.colors.error) || iconColor}
                />
              ) : (
                <TextInput.Icon
                  onPress={() => setHidePassword(true)}
                  name='eye-off'
                  color={(error && defaultStyleOverides.theme.colors.error) || iconColor}
                />
              )
            }
            error={error}
            secureTextEntry={hidePassword}
            {...props}
            {...defaultStyleOverides}
          />
          <HelperText type='error' style={{ color: defaultStyleOverides.theme.colors.error }} visible={error}>
            {helperText}
          </HelperText>
        </View>
      )}
    />
  );
}
