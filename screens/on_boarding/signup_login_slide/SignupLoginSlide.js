import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import FadeContainer from '../../../components/fade_container/FadeContainer';
import Logo from '../../../components/logo/Logo';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import { useEffect, useState } from 'react';

export default function SignupLogoinSlide({ progressPos, slideLength, navigation }) {
  const { onBoarding } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [forms, setForms] = useState({ login: false, signUp: false });

  useEffect(() => {
    if (progressPos === slideLength) {
      const timeout = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timeout);
    }
    setIsVisible(false);
  }, [progressPos]);

  useEffect(() => {
    if (Object.values(forms).every((form) => form === false)) return setIsVisible(true);
    setIsVisible(false);
  }, [forms]);

  const openForm = (form) => {
    let updatedForms = forms;
    Object.keys(updatedForms).forEach((key) => {
      key !== form ? (updatedForms[key] = false) : null;
    });
    updatedForms[form] = true;
    setForms({ ...updatedForms });
  };

  const resetForms = () => {
    let updatedForms = forms;
    Object.keys(updatedForms).forEach((key) => {
      updatedForms[key] = false;
    });
    setForms({ ...updatedForms });
  };

  return (
    <>
      <FadeContainer style={styles.slideContainer} isVisible={isVisible} speed={250}>
        <Logo
          containerStyle={styles.logoContainer}
          color={onBoarding.header}
          size={Dimensions.get('window').width / 4}
        />
        <View style={styles.formBtnsContainer}>
          <View style={styles.btnsWrapper}>
            <FormBtn
              style={{ backgroundColor: onBoarding.signupBtn }}
              txtColor={onBoarding.signupBtnTxt}
              text='Sign up'
              onPress={() => openForm('signUp')}
            />
            <FormBtn
              style={{ ...styles.bottomBtn, backgroundColor: onBoarding.loginBtn }}
              txtColor={onBoarding.loginBtnTxt}
              text='Login'
              onPress={() => openForm('login')}
            />
          </View>
          <BtnsDivider />
          <View style={styles.btnsWrapper}>
            <FormBtn
              style={{ backgroundColor: onBoarding.alternativeBtn }}
              txtColor={onBoarding.alternativeBtnTxt}
              text='Sign in with Google'
            />
            <FormBtn
              style={{ ...styles.bottomBtn, backgroundColor: onBoarding.alternativeBtn }}
              txtColor={onBoarding.alternativeBtnTxt}
              text='Sign in with Facebook'
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <SeeCatalogBtn onPress={() => navigation.navigate('Discover')} />
        </View>
      </FadeContainer>
      <Modal
        presentationStyle='overFullScreen'
        statusBarTranslucent={true}
        transparent={true}
        visible={Object.values(forms).some((form) => form === true)}
        animationType='fade'
      >
        {forms.login ? (
          <LoginForm onClosePress={() => resetForms()} navigation={navigation} />
        ) : forms.signUp ? (
          <SignUpForm onClosePress={() => resetForms()} navigation={navigation} />
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}

function FormBtn({ style, text, onPress, txtColor }) {
  return (
    <TouchableOpacity
      style={{ ...styles.btn, ...style }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={{ ...styles.btnTxt, color: txtColor }}>{text}</Text>
    </TouchableOpacity>
  );
}

function SeeCatalogBtn({ onPress }) {
  const { onBoarding } = useTheme();

  return (
    <TouchableOpacity style={styles.seeCatalogBtn} onPress={onPress}>
      <Text style={{ ...styles.seeCatalogTxt, color: onBoarding.seeCatalogTxt }}>
        See the catalog
      </Text>
    </TouchableOpacity>
  );
}

function BtnsDivider() {
  const { onBoarding } = useTheme();

  const Bar = () => (
    <View
      style={{ ...styles.dividerBar, backgroundColor: onBoarding.signupLoginDividerBar }}
    ></View>
  );

  return (
    <View style={styles.dividerContainer}>
      <Bar />
      <Text style={{ ...styles.dividerTxt, color: onBoarding.signupLoginDividerBar }}>
        OR
      </Text>
      <Bar />
    </View>
  );
}
