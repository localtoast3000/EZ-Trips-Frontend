export default class LightTheme {
  dark = false;

  // Suffix C = contrast color
  // Preffix pa = Palette
  // Preffix bg = Background
  // Preffix gs = Greyscale

  theme = {
    pa1: '#C46B4D',
    pa2: '#177861',
    pa1C: '#ffffff',
    pa2C: '#ffffff',

    bg1: '#ffffff',
    bg1C: '#000000',

    gs0: '#000000',
    gs1: '#0d0d0d',
    gs2: '#1a1a1a',
    gs3: '#333333',
    gs4: '#727272',
    gs5: '#bfbfbf',
    gs6: '#fafafa',
    gs7: '#ffffff',
  };

  profile = {
    textInputPrimary: this.theme.gs0,
    textInputActive: this.theme.gs0,
    textInputPlaceholder: this.theme.gs3,
    textInputTxt: this.theme.gs0,
    textInputUnderline: this.theme.gs0,
    error: '#ff4949',
    inputIcon: this.theme.gs1,
    submitBtn: this.theme.pa1,
    submitBtnText: this.theme.gs7,
  };

  nextStep = {
    animatedPath: this.theme.gs7,
    animatedPointer: this.theme.pa1,
    stepInfoBg: this.theme.pa2,
    lastStepInfoBg: this.theme.pa1,
    stepInfoText: this.theme.gs7,
    modalCloseBtn: this.theme.gs0,
    modalBg: this.theme.gs7,
    infoNextBtn: this.theme.pa2,
    infoNextBtnTxt: this.theme.gs7,
    lastRestartBtn: this.theme.pa2,
    lastRestartBtnTxt: this.theme.gs7,
  };

  onBoarding = {
    progressBarPos: this.theme.pa2,
    progressBarBg: this.theme.gs7,
    header: this.theme.gs7,
    text: this.theme.gs7,
    welcomeTxt: this.theme.gs7,
    icon: this.theme.gs7,
    signupBtn: this.theme.pa1,
    signupBtnTxt: this.theme.gs7,
    loginBtn: this.theme.pa1,
    loginBtnTxt: this.theme.gs7,
    signupLoginDividerBar: this.theme.gs7,
    alternativeBtn: this.theme.gs0,
    alternativeBtnTxt: this.theme.gs7,
    seeCatalogTxt: this.theme.gs7,
    formModalBackground: '#00000066',
    closeBtnIcon: this.theme.gs7,
    textInputPrimary: this.theme.gs7,
    textInputActive: this.theme.gs7,
    textInputPlaceholder: this.theme.gs6,
    textInputTxt: this.theme.gs7,
    textInputUnderline: this.theme.gs7,
    error: '#ff4949',
    inputIcon: this.theme.gs6,
    submitBtn: this.theme.pa2,
    submitBtnText: this.theme.gs7,
  };

  // @react-navigation/native
  // NavigationContainer theme propertys
  colors = {
    primary: this.theme.gs0,
    background: this.theme.bg1,
    card: this.theme.gs1,
    text: this.theme.gs0,
    border: this.theme.gs0,
    notification: this.theme.gs0,
  };
}
