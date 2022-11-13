import { View, Text, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './style.css';
import BackgroundImageLayer from '../../components/background_image_layer/BackgroundImageLayer';
import mountImg from '../../assets/images/Mountain.png';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import AnimatedProgressPath from './animated_progress_path/AnimatedProgressPath';
import { useTheme } from '@react-navigation/native';
import { loadFonts } from '../../assets/fonts/fonts';
import LastStep from './step_info/LastStep';
import StepInfo from './step_info/StepInfo';

export default function NexStep({ navigation, route: { params: data } }) {
  console.disableYellowBox = true;
  const { nextStep } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const incrementStep = () => {
    setCurrentStep((current) => (current < 5 ? current + 1 : 0));
  };

  useEffect(() => {
    if (currentStep === 0) incrementStep();
  }, [currentStep]);

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <>
      <BackgroundImageLayer
        source={mountImg}
        layerOpacity={0.1}
        style={styles.imageBackground}
      />
      <View
        style={{
          ...styles.mainContainer,
        }}
      >
        <Text style={styles.title}>Next Steps</Text>
        <AnimatedProgressPath
          containerScale={1.4}
          containerStyle={{
            ...styles.animatedPathContainer,
            top: Dimensions.get('window').height / 6.5,
            left: Dimensions.get('window').width / 20,
          }}
          pathColor={nextStep.animatedPath}
          pointerColor={nextStep.animatedPointer}
          pointerScale={1}
          step={currentStep}
        />
        {stepInfoCollection(currentStep, incrementStep)[currentStep - 1]}
      </View>
      <BottomToolbar />
    </>
  );
}

function stepInfoCollection(currentStep, incrementStep) {
  const { nextStep } = useTheme();
  const heightGrid = Dimensions.get('window').height / 6.5;
  const widthGrid = Dimensions.get('window').width / 20;

  return [
    <StepInfo
      label='Wait it out'
      title={`Request sent`}
      information={
        'The travel agency is treating your request and will get back to you shortly.'
      }
      step={1}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 140,
        transform: [{ translateX: widthGrid + 50 }, { translateY: heightGrid - 195 }],
      }}
    />,
    <StepInfo
      label='Check it out'
      title='Review the quotation'
      information={`You'll get a notification once your quotation is ready, from there take your time to read it through and confirm it.`}
      step={2}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 140,
        transform: [{ translateX: widthGrid + 185 }, { translateY: heightGrid - 270 }],
      }}
    />,
    <StepInfo
      label='Cash out'
      title='Payment'
      information={`Upon accepting the quotation, the travel agency will get in touch with you via email to review the last details and proceed with payment`}
      step={3}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 140,
        transform: [{ translateX: widthGrid + 25 }, { translateY: heightGrid - 385 }],
      }}
    />,
    <StepInfo
      label='Getting ready'
      title='Add your documents'
      information={`You'll find all the details of your reservation directly on EZ TRIPS in the 'My trips' section. You can add your travel documents on your profile, in the 'My Documents' section`}
      step={4}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 160,
        transform: [{ translateX: widthGrid + 140 }, { translateY: heightGrid - 485 }],
      }}
    />,
    <LastStep
      label='See you when you get back'
      title='See you when you get back'
      information={'Have a nice trip!'}
      step={5}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.lastStepInfoBg,
        width: '80%',
        marginLeft: 0,
        left: '10%',
        transform: [{ translateY: heightGrid - 615 }],
      }}
    />,
  ];
}
