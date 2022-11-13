import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Plane from '../../components/icons/Plane';
import HorizontalScrollView from '../../components/horzontal_scroll_view/HorizontalScrollView';
import HeartIcon from '../../components/icons/HeartIcon';
import Trip from '../../components/trip/trip';
import styles from './style.css';
import { serverURL } from '../../api/backend_request';
import { useSelector } from 'react-redux';

export default function MyTrips({ navigation }) {
  const TOKEN = useSelector((state) => state.user.value.token);
  const favorites = useSelector((state) => state.user.favorites);
  const [tripsLiked, setTripsLiked] = useState([]);
  const [tripsBooked, setTripsBooked] = useState([]);

  useEffect(() => {
    fetch(`${serverURL}/users/like/${TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log('fetch of liked trips successful on MyTrips');
          setTripsLiked(data.tripsLiked);
        } else {
          console.log('Fetch of trips failed on MyTrips.');
        }
      });

    //GET THE TRIPS BOOKED BY THE USER
    fetch(`${serverURL}/orders/${TOKEN}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.result) {
          const bookedTrips = [];
          console.log('Fetch of booked trips successful on MyTrips');
          for (let order of response.data) {
            //Si les orders sont en statut Validated, on les ajoute à tripsBooked.
            if (order.status === 'Validated') {
              bookedTrips.unshift(order);
            }
          }
          setTripsBooked(bookedTrips);
        }
        //si data.result = false, le fetch a failed
        else {
          console.log('Fetch of booked trips failed on MyTrips.');
        }
      });
  }, [favorites]);

  let likedTrips = <Text style={{ fontFamily: 'txt' }}>No trips liked yet.</Text>;
  if (tripsLiked && tripsLiked.length > 0) {
    likedTrips = tripsLiked.map((data, i) => {
      const isFavorite = favorites.some((favorite) => favorite.id === data.id);
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
          {...data}
          id={data._id}
          isFavorite={isFavorite}
        ></Trip>
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
          end={end}
        ></Trip>
      );
    });
  }

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>My trips</Text>
        <TripScroller
          title='Liked trips'
          icon={<HeartIcon scale={0.35} color='black' stroke={4} />}
          trips={likedTrips}
        />
        <TripScroller
          title='Planned Trips'
          icon={<Plane scale={1.7} color='black' stroke={0.8} />}
          trips={planedTrips}
        />
        <ViewDocumentsBtn onPress={() => navigation.navigate('MyDocuments')} />
      </View>
      <BottomToolbar />
    </>
  );
}

function TripScroller({ icon, title, trips }) {
  return (
    <>
      <TripsHeader icon={icon} title={title} />
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
    <TouchableOpacity style={styles.documentBtn} onPress={onPress}>
      <Text style={styles.documentBtnTxt}>View documents</Text>
    </TouchableOpacity>
  );
}
