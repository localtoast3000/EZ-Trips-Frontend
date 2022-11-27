import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import ProgressBar from '../../components/progressBar/progressBar';
import SwipeContainer from '../../components/swipe_container/SwipeContainer';
import SwipeArrow from '../../components/icons/SwipeArrow';
import FadeContainer from '../../components/fade_container/FadeContainer';
import PulsingContainer from '../../components/pulsing_container/PulsingContainer';
import HorizontalSlideContainer from '../../components/horizontal_slide_container/HorizontalSlideContainer';
import SignupLoginSlide from './signup_login_slide/SignupLoginSlide';
import Logo from '../../components/logo/Logo';
import VideoBackground from '../../components/video_background/VideoBackground';
import canyonVideo from '../../assets/videos/Canyon.mp4';
import { inspect } from '../../lib/inspector';

export default function OnBoarding({ navigation }) {
  const loadedFonts = loadFonts();
  const { onBoarding } = useTheme();
  const animationSpeed = 250;
  const [progress, setProgress] = useState(1);
  const [direction, setDirection] = useState({ direction: false });
  const slides = [TitleSlide, SecondSlide, ThirdSlide, FourthSlide, SignupLoginSlide];
  const [animating, setAnimating] = useState(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  useEffect(() => {
    if (animating) return;
    if (!direction.direction) return;
    if (direction.direction === 'left')
      return setProgress(progress < slides.length ? progress + 1 : progress);
    if (direction.direction === 'right')
      return setProgress(progress > 1 ? progress - 1 : progress);
  }, [direction]);

  useEffect(() => {
    if (!animating) return;
    const timeout = setTimeout(() => setAnimating(false), animationSpeed);
    return () => clearTimeout(timeout);
  }, [animating]);

  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      <VideoBackground
        source={canyonVideo}
        layerOpacity={videoIsPlaying ? 0.5 : 0.5}
        onStatusChange={(status) => setVideoIsPlaying(status.isPlaying)}>
        {videoIsPlaying
          ? (absoluteStyle) => (
              <SwipeContainer
                style={{ ...absoluteStyle, ...styles.swipeContainer }}
                onSwipe={({ direction }) => setDirection(direction)}>
                <FadeContainer
                  isVisible={progress === slides.length ? false : true}
                  speed={animationSpeed}>
                  <ProgressBar
                    slideQty={slides.length}
                    currentSlide={progress}
                    animationSpeed={animationSpeed}
                  />
                </FadeContainer>
                <HorizontalSlideContainer
                  speed={animationSpeed}
                  direction={direction}
                  currentSlide={progress}
                  slideLength={slides.length}
                  disableAnimation={animating ? true : false}
                  onAnimation={() => setAnimating(true)}>
                  {slides.map((Slide, i) => {
                    return (
                      <View
                        key={i}
                        style={{ width: '100%' }}>
                        <Slide
                          isVisible={progress === i + 1 ? true : false}
                          direction={direction}
                          progressPos={progress}
                          slideLength={slides.length}
                          navigation={navigation}
                        />
                      </View>
                    );
                  })}
                </HorizontalSlideContainer>
                <View style={styles.bottomContainer}>
                  <View style={styles.paddingBox}></View>
                  <FadeContainer
                    isVisible={progress > 1 ? false : true}
                    speed={animationSpeed}>
                    <Text style={{ ...styles.welcomeTxt, color: onBoarding.welcomeTxt }}>
                      Welcome
                    </Text>
                  </FadeContainer>
                  <PulsingContainer
                    style={styles.paddingBox}
                    isVisible={progress < slides.length ? true : false}
                    speed={animationSpeed}>
                    <TouchableOpacity
                      onPress={() => setDirection({ direction: 'left' })}
                      activeOpacity={1}>
                      <SwipeArrow />
                    </TouchableOpacity>
                  </PulsingContainer>
                </View>
              </SwipeContainer>
            )
          : () => <></>}
      </VideoBackground>
    </View>
  );
}

function TitleSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <FadeContainer
      {...props}
      style={styles.slideContainer}>
      <Logo
        color={onBoarding.header}
        size={Dimensions.get('window').width / 3.2}
      />
    </FadeContainer>
  );
}

function SecondSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <View
      {...props}
      style={styles.slideContainer}>
      <Text style={{ ...styles.descriptionSlideHeader, color: onBoarding.text }}>
        A human adventure
      </Text>
      <Text style={{ ...styles.descriptionSlideText, color: onBoarding.text }}>
        At EZ TRIPS, we believe that travelling broadens the mind and has the potential to
        change the way you think. Through a new travel experience, we want to connect
        people that wouldn't have met otherwise.
      </Text>
    </View>
  );
}

function ThirdSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <View
      {...props}
      style={styles.slideContainer}>
      <Text style={{ ...styles.descriptionSlideHeader, color: onBoarding.text }}>
        Quality service
      </Text>
      <Text style={{ ...styles.descriptionSlideText, color: onBoarding.text }}>
        At EZ TRIPS, our mission is to deliver and ensure excellent quality service to our
        clients. We curated and vetted every travel agency and trip you'll come across on
        our app.
      </Text>
    </View>
  );
}

function FourthSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <View
      {...props}
      style={styles.slideContainer}>
      <Text style={{ ...styles.descriptionSlideHeader, color: onBoarding.text }}>
        Commited partners
      </Text>
      <Text style={{ ...styles.descriptionSlideText, color: onBoarding.text }}>
        We partner mainly with small travel agencies and make fair tourism our priority.
        We make sure everyone is compensated equitably, from your travel agent to your
        local guide.
      </Text>
    </View>
  );
}
