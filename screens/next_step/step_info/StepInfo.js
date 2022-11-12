import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import CrossBtn from '../../../components/close_button/CloseButton';
import FadeContainer from '../../../components/fade_container/FadeContainer';

export default function StepInfo({ label, step, title, information, currentStep, containerStyle, incrementStep }) {
  const { nextStep } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  console.disableYellowBox = true;
  return (
    <>
      <FadeContainer
        style={{ ...styles.infoContainer, ...containerStyle }}
        isVisible={currentStep === step ? true : false}>
        <Text style={{ ...styles.label, color: nextStep.stepInfoText }}>{label}</Text>
        <CrossBtn
          style={styles.btn}
          iconColor={nextStep.stepInfoText}
          iconScale={0.3}
          iconStyle={{ transform: [{ rotate: '45deg' }] }}
          onPress={() => setModalVisible(true)}
        />
      </FadeContainer>
      <Modal
        transparent={true}
        presentationStyle={'overFullScreen'}
        visible={modalVisible}
        animated={true}
        animationType={'fade'}
        statusBarTranslucent={true}>
        <View style={{ ...styles.contentContainer }}>
          <View style={{ ...styles.contentWrapper, backgroundColor: nextStep.modalBg }}>
            <CrossBtn
              style={styles.modalCloseBtn}
              iconColor={nextStep.modalCloseBtn}
              iconScale={0.4}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.information}>{information}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.nextBtn, backgroundColor: nextStep.infoNextBtn }}
              onPress={() => {
                setModalVisible(false);
                incrementStep();
              }}>
              <Text style={{ ...styles.nextBtnTxt, color: nextStep.infoNextBtnTxt }}>Next Step</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
