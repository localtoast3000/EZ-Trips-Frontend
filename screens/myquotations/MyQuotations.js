import { ScrollView, View, Text, Linking, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Contact from '../../components/icons/contact';
import SwipeLeft from '../../components/icons/swipeleft';
import TripPlaned from '../../components/icons/tripplaned';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trip from '../../components/trip/trip';
import styles from './style.css';
import { serverURL } from '../../api/backend_request';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthName, convertDate } from '../../assets/helpers';

export default function MyQuotations() {
  //constantes générales
  const TOKEN = useSelector((state) => state.user.value.token);

  //store les orders à display (sent + received)
  const [requestSent, setRequestSent] = useState([]);
  const [quotationReceived, setQuotationReceived] = useState([]);

  useEffect(() => {
    //GET THE TRIPS BOOKED BY THE USER
    fetch(`${serverURL}/orders/${TOKEN}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.result) {
          const totalRequests = []
          const totalQuotations = []
          console.log('Fetch of orders successful on MyQuotations');
          for (let order of response.data) {
            //Si les orders sont en statut Requested ou Received, on les ajoute aux états React correspondant
            if (order.status === 'Requested' && !totalRequests.some((e) => e._id === order._id)) {
              //utilisation de unshift() plutôt que push, car unshift() ajoute la valeur au début du tableau ; ainsi le dernier élément ajouté s'affiche en 1er.
              totalRequests.unshift(order)
            } else if (order.status === 'Received' && !totalQuotations.some((e) => e._id === order._id)) {
              totalQuotations.unshift(order)
            }
          }
          setRequestSent(totalRequests) 
          setQuotationReceived(totalQuotations)
        }
        //si data.result = false, le fetch a failed
        else {
          console.log('Fetch of orders failed on MyQuotations.');
        }
      });
  }, []);

  // ---------------- MAP QUOTATION ASKED ----------------

  //s'il n'y a rien à afficher (requestSent.length = 0), on ne display qu'une balise Text
  let sentDisplay = <Text style={{ fontFamily: 'txt' }}>No quotation asked yet.</Text>;

  if (requestSent.length > 0) {
    sentDisplay = requestSent.map((data, i) => {
      let start = data.start.slice(5, 10);
      let end = data.end.slice(5, 10);

      return (
        <View key={i} style={styles.tripContainer}>
          <Text style={{ marginTop: 10, marginBottom: -12 }}>
            Quotation asked for{' '}
            <Text style={{ fontWeight: 'bold', color: 'orange' }}>{data.nbTravelers} persons</Text>.
          </Text>
          <View
            name='bordereau status'
            style={{
              borderRadius: 5,
              width: '50%',
              zIndex: 2,
              position: 'absolute',
              top: '45%',
              backgroundColor: '#C46B4D',
              height: '20%',
              flex: 1,
              left: '50%',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              name='text bordereau'
              style={{ fontSize: 12, fontFamily: 'txt', color: 'white', borderBottomRightRadius: 25 }}>
              Waiting for partner's response
            </Text>
          </View>
          <Trip
            id={data._id}
            price={data.totalPrice}
            country={data.trip.country}
            background={data.trip.background}
            name={data.trip.name}
            start={start}
            end={end}></Trip>
        </View>
      );
    });
  }

  // ---------------- MAP QUOTATION RECEIVED ----------------

  //s'il n'y a rien à afficher (requestSent.length = 0), on ne display qu'une balise Text
  let quotationDisplay = <Text style={{ fontFamily: 'txt' }}>No quotation received yet.</Text>;

  if (quotationReceived.length > 0) {
    quotationDisplay = quotationReceived.map((data, i) => {
      let start = data.start.slice(5, 10);
      let end = data.end.slice(5, 10);

      return (
        <View key={i} style={styles.tripContainer}>
          <Text style={{ marginTop: 10, marginBottom: -12 }}>
            Quotation received for{' '}
            <Text style={{ fontWeight: 'bold', color: 'orange' }}>{data.nbTravelers} persons</Text>.
          </Text>
          <View
            name='bordereau status'
            style={{
              borderRadius: 5,
              width: '50%',
              zIndex: 2,
              position: 'absolute',
              top: '45%',
              backgroundColor: '#8BC4B7',
              height: '20%',
              flex: 1,
              left: '50%',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text style={{ fontSize: 13, fontFamily: 'txt', color: 'white', borderBottomRightRadius: 25 }}>
              Check it out now!
            </Text>
          </View>
          <Trip
            id={data._id}
            price={data.totalPrice}
            country={data.trip.country}
            background={data.trip.background}
            name={data.trip.name}
            start={start}
            end={end}></Trip>
        </View>
      );
    });
  }

  //*FONT CODE
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <Text style={styles.title}>My quotations</Text>
      </View>
      {/* ---------------- DEVIS DEMANDES ---------------- */}
      <View style={styles.cont}>
        <View style={styles.sousHeader}>
          <Ionicons name='send-outline' size={30} color={'black'} />
          <Text style={styles.smallTitle}>Request sent</Text>
        </View>
        <View style={styles.border}></View>
        <ScrollView horizontal={true} style={styles.scrollView}>
          {sentDisplay}
        </ScrollView>
        <View style={{ marginTop: -16, zIndex: 1, top: -150, left: 340 }}>
          {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
          {/* {requestSent.length > 1 ? <SwipeLeft /> : false} */}
        </View>
        {/* <LinearGradient 
        start={{x: 0.75, y: 0.75}} end={{x: 0, y: 0.75}}
        colors={['rgba(255,255,255,0.7)', 'transparent']}
        style={{position: 'absolute', width: 75, height: 210, top: 25, left: '82%'}}></LinearGradient> */}
      </View>

      {/* ---------------- DEVIS RECUS ---------------- */}
      <View style={styles.cont}>
        <View style={styles.sousHeader}>
          <Ionicons name='mail-unread-outline' size={30} color={'black'} />
          <Text style={styles.smallTitle}>Quotation received</Text>
        </View>
        <View style={styles.border}></View>

        <ScrollView horizontal={true} style={styles.scrollView}>
          {quotationDisplay}
        </ScrollView>
        <View style={{marginTop: -16, zIndex: 1, top: -150, left: 350 }}>
          {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
          {/* {quotationReceived.length > 1 ? <SwipeLeft /> : false} */}
        </View>
        {/* ---------------- WHITE GRADIENT ON THE RIGHT OF THE SCROLL LEFT ---------------- */}
        {/* <LinearGradient
          start={{ x: 0.75, y: 0.75 }}
          end={{ x: 0, y: 0.75 }}
          colors={['rgba(255,255,255,0.7)', 'transparent']}
          style={{ position: 'absolute', width: 75, height: 212, top: '19.5%', left: '82%' }}></LinearGradient> */}
      </View>

      {/* ---------------- FOOTER BOTTOM BAR ---------------- */}
      <View style={{ height: 70 }}></View>
      <BottomToolbar />
    </View>
  );
}
