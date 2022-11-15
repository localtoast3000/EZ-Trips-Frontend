import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Plane from '../../components/icons/Plane';
import HorizontalScrollView from '../../components/horzontal_scroll_view/HorizontalScrollView';
import HeartIcon from '../../components/icons/HeartIcon';
import Trip from '../../components/trip/trip';
import styles from './style.css';
import { getData } from '../../api/backend_request';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reducers/user';
import { headerScale } from '../../global/scales';

export default function MyTrips({ navigation }) {
  const { user, favorites } = useSelector(selectUser);
  const [tripsLiked, setTripsLiked] = useState([]);
  const [tripsBooked, setTripsBooked] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getData('/users/like/' + user.token);
      if (res.result) setTripsLiked(res.tripsLiked);
      else console.log('Failed to fetch users likes');
    })();

    (async () => {
      const res = await getData('/orders/' + user.token);
      if (res.result) {
        const bookedTrips = [];
        for (let order of res.data) {
          if (order.status === 'Validated') {
            bookedTrips.unshift(order);
          }
        }
        setTripsBooked(bookedTrips);
      } else console.log('Failed to fetch orders');
    })();
  }, [favorites]);

  let likedTrips = <Text style={{ fontFamily: 'txt' }}>No trips liked yet.</Text>;
  if (tripsLiked && tripsLiked.length > 0) {
    likedTrips = tripsLiked.map((trip, i) => {
      return (
        <TouchableOpacity
          key={i}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate({
              name: 'Product',
              params: trip,
              merge: true,
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
            priceStyles={styles.tripCardPrice}></Trip>
        </TouchableOpacity>
      );
    });
  }

  let planedTrips = (
    <Text style={{ fontFamily: 'txt' }}>No planned trip yet. Book one now! </Text>
  );
  if (tripsBooked && tripsBooked.length > 0) {
    planedTrips = tripsBooked.map((data, i) => {
      let start = data.start.slice(5, 10);
      let end = data.end.slice(5, 10);
      return (
        <Trip
          key={i}
          containerStyles={styles.tripCardContainer}
          topElementsContainerStyles={styles.tripCardTopElementsContainer}
          countryStyles={styles.tripCardCountry}
          heartStyles={styles.tripCardheart}
          titleStyles={styles.tripCardTitle}
          dateStyles={styles.tripCardDate}
          priceStyles={styles.tripCardPrice}
          id={data._id}
          price={data.totalPrice}
          country={data.trip.country}
          background={data.trip.background}
          name={data.trip.name}
          start={start}
          end={end}></Trip>
      );
    });
  }

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={{ ...styles.header, ...headerScale }}>My trips</Text>
          <ViewDocumentsBtn onPress={() => navigation.navigate('MyDocuments')} />
        </View>
        <TripScroller
          title='Liked trips'
          icon={
            <HeartIcon
              scale={0.35}
              color='black'
              stroke={4}
            />
          }
          trips={likedTrips}
        />
        <TripScroller
          title='Planned Trips'
          icon={
            <Plane
              scale={1.7}
              color='black'
              stroke={0.8}
            />
          }
          trips={planedTrips}
        />
      </View>
      <BottomToolbar />
    </>
  );
}

function TripScroller({ icon, title, trips }) {
  return (
    <>
      <TripsHeader
        icon={icon}
        title={title}
      />
      <HorizontalScrollView style={styles.scrollContainer}>{trips}</HorizontalScrollView>
    </>
  );
}

function TripsHeader({ icon, title }) {
  return (
    <View style={styles.sousHeaderContainer}>
      <View style={styles.sousHeader}>
        {icon}
        <Text style={styles.smallTitle}>{title}</Text>
      </View>
      <View style={styles.border}></View>
    </View>
  );
}

function ViewDocumentsBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.documentBtn}
      onPress={onPress}>
      <Text
        style={{
          ...styles.documentBtnTxt,
          fontSize: Dimensions.get('window').width / 30,
        }}>
        View documents
      </Text>
    </TouchableOpacity>
  );
}
