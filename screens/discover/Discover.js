import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import styles from './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import { setFavorites } from '../../reducers/user';
import { getData } from '../../api/backend_request';
import { selectUser } from '../../reducers/user';
import { headerScale } from '../../global/scales';

export default function Discover({ navigation }) {
  const loadedFonts = loadFonts();
  const dispatch = useDispatch();
  const [tripsData, setTripsData] = useState([]);
  const { user, favorites } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const res = await getData('/trips');
      if (res.result) setTripsData(res.trips);
      else console.log('Failed to fetch trips');
    })();

    user &&
      (async () => {
        const res = await getData('/users/idLike/' + user.token);
        if (res.result) dispatch(setFavorites(res.tripsLiked));
        else console.log('Failed to fetch user likes');
      })();
  }, []);

  if (!loadedFonts) return <></>;

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.header}>
          <View style={styles.headerAndLoginSignupBtnWrapper}>
            <Text style={{ ...styles.title, ...headerScale }}>Discover</Text>
            {!user ? <SignUpLoginBtn navigation={navigation} /> : <></>}
          </View>
          <Text style={styles.text}>Choose your next adventure.</Text>
          <View style={styles.border}></View>
        </View>
        <Highlight />
        <Text style={styles.tripsHeader}>Our recommendations</Text>
        <View style={styles.tripsContainer}>
          {tripsData.map((trip, i) => {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate({
                    name: 'Product',
                    params: trip,
                  })
                }>
                <Trip
                  id={trip._id}
                  name={trip.name}
                  country={trip.country}
                  travelPeriod={trip.travelPeriod}
                  background={trip.background}
                  minPrice={Math.min(...trip.program.map(({ price }) => price))}
                  isFavorite={favorites.some((favorite) => favorite === trip._id)}
                  containerStyles={styles.tripCardContainer}
                  topElementsContainerStyles={styles.tripCardTopElementsContainer}
                  countryStyles={styles.tripCardCountry}
                  heartStyles={styles.tripCardheart}
                  titleStyles={styles.tripCardTitle}
                  dateStyles={styles.tripCardDate}
                  priceStyles={styles.tripCardPrice}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        {user ? <View style={{ height: 100 }}></View> : <></>}
      </ScrollView>
      {user ? <BottomToolbar /> : <></>}
    </>
  );
}

function Highlight() {
  return (
    <View style={styles.highlightContainer}>
      <Text style={styles.highlightHeader}>Highlight</Text>
      <View style={styles.highlightWrapper}>
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          style={{ ...styles.highlightImg, width: Dimensions.get('window').width / 2.5 }}
          source={{
            uri: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
          }}>
          <View style={styles.imageLayer}></View>
        </ImageBackground>
        <View
          style={{
            ...styles.highlightInfoContainer,
            width: Dimensions.get('window').width / 2.2,
          }}>
          <Text style={styles.highlightTitle}>Norway fjords and northern lights</Text>
          <Text style={styles.highlightDates}>20 jan. - 28 feb. 2023</Text>
          <Text style={styles.highlightDescription}>
            We have spent decades in search for the most beautiful spots in the north,
            come join us! We bring you to the right spot at the right time. Come chase the
            northern lights with us.
          </Text>
        </View>
      </View>
    </View>
  );
}

function SignUpLoginBtn({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.signUpLoginBtn}
      onPress={() => navigation.navigate({ name: 'OnBoarding' })}>
      <Text style={{ ...styles.signUpLoginBtnTxt, ...styles.text }}>Sign-up / Login</Text>
    </TouchableOpacity>
  );
}
