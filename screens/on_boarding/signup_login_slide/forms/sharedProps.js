import { useTheme } from '@react-navigation/native';

export function rnPaperTextInputTheme() {
  const { onBoarding } = useTheme();

  return {
    theme: {
      colors: {
        primary: onBoarding.textInputPrimary,
        accent: onBoarding.textInputActive,
        placeholder: onBoarding.textInputPlaceholder,
        text: onBoarding.textInputTxt,
        background: 'transparent',
        error: onBoarding.error,
      },
    },
    underlineColor: onBoarding.textInputUnderline,
    underlineColorAndroid: onBoarding.textInputUnderline,
  };
}
