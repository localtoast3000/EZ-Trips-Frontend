import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import TripPlaned from '../../components/icons/tripplaned';
import HorizontalScrollView from '../../components/horzontal_scroll_view/HorizontalScrollView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Trip from '../../components/trip/trip';
import styles from './style.css';
import { serverURL } from '../../api/backend_request';
import { useSelector } from 'react-redux';

export default function MyTrips({ navigation }) {
  //constantes générales
  const tripLiked = useSelector((state) => state.user.favorites);
  const TOKEN = useSelector((state) => state.user.value.token);
  const favorites = useSelector((state) => state.user.favorites);

  //store les trips à display (liked + booked)
  const [tripsLiked, setTripsLiked] = useState([]);
  const [tripsBooked, setTripsBooked] = useState([]);

  useEffect(() => {
    //GET THE TRIPS LIKED BY THE USER
    fetch(`${serverURL}/users/like/${TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
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
  }, []);

  //---------------- MAP LIKED TRIPS  ----------------

  let likedTrips = (
    <Text style={{ fontFamily: 'txt' }}>No liked trip yet. Book one now! </Text>
  );
  if (tripsLiked) {
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

  // ---------------- MAP PLANED TRIPS ----------------

  //if tripsBooked is empty, just show a default Text div.
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

  //*FONT CODE
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>My trips</Text>
        <TripScroller
          title='Liked trips'
          icon={<AntDesign name='heart' size={23} color={'black'} />}
          trips={likedTrips}
        />
        <TripScroller title='Planned Trips' icon={<TripPlaned />} trips={planedTrips} />
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
