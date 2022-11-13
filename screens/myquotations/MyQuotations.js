import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import HorizontalScrollView from '../../components/horzontal_scroll_view/HorizontalScrollView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trip from '../../components/trip/trip';
import styles from './style.css';
import { serverURL } from '../../api/backend_request';
import { useSelector } from 'react-redux';

export default function MyQuotations() {
  const loadedFonts = loadFonts();
  const TOKEN = useSelector((state) => state.user.value.token);
  const [requestSent, setRequestSent] = useState([]);
  const [quotationReceived, setQuotationReceived] = useState([]);

  useEffect(() => {
    //GET THE TRIPS BOOKED BY THE USER
    fetch(`${serverURL}/orders/${TOKEN}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.result) {
          const totalRequests = [];
          const totalQuotations = [];
          console.log('Fetch of orders successful on MyQuotations');
          for (let order of response.data) {
            //Si les orders sont en statut Requested ou Received, on les ajoute aux états React correspondant
            if (
              order.status === 'Requested' &&
              !totalRequests.some((e) => e._id === order._id)
            ) {
              //utilisation de unshift() plutôt que push, car unshift() ajoute la valeur au début du tableau ; ainsi le dernier élément ajouté s'affiche en 1er.
              totalRequests.unshift(order);
            } else if (
              order.status === 'Received' &&
              !totalQuotations.some((e) => e._id === order._id)
            ) {
              totalQuotations.unshift(order);
            }
          }
          setRequestSent(totalRequests);
          setQuotationReceived(totalQuotations);
        }
        //si data.result = false, le fetch a failed
        else {
          console.log('Fetch of orders failed on MyQuotations.');
        }
      });
  }, []);

  let sentDisplay = <Text style={{ fontFamily: 'txt' }}>No quotation asked yet.</Text>;

  if (requestSent.length > 0) {
    sentDisplay = requestSent.map((data, i) => {
      let start = data.start.slice(5, 10);
      let end = data.end.slice(5, 10);

      return (
        <View key={i} style={styles.tripQuoteStatusContainer}>
          <QuotationStatusMsg status='requested' travelerQty={10} />
          <Trip
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
        </View>
      );
    });
  }

  let quotationDisplay = (
    <Text style={{ fontFamily: 'txt' }}>No quotation received yet.</Text>
  );

  if (quotationReceived.length > 0) {
    quotationDisplay = quotationReceived.map((data, i) => {
      let start = data.start.slice(5, 10);
      let end = data.end.slice(5, 10);

      return (
        <View key={i} style={styles.tripQuoteStatusContainer}>
          <QuotationStatusMsg status='recived' travelerQty={data.nbTravellers} />
          <Trip
            containerStyles={styles.tripCardContainer}
            topElementsContainerStyles={styles.tripCardTopElementsContainer}
            heartStyles={styles.tripsCardheart}
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
        </View>
      );
    });
  }

  if (!loadedFonts) return <></>;

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>My quotations</Text>
        <TripScroller
          title='Request sent'
          icon={<Ionicons name='send-outline' size={22} color={'black'} />}
          trips={sentDisplay}
        />
        <TripScroller
          title='Quotation received'
          icon={<Ionicons name='mail-unread-outline' size={24} color={'black'} />}
          trips={sentDisplay}
        />
        <View style={{ height: 100 }}></View>
      </View>
      <BottomToolbar />
    </>
  );
}

function QuotationStatusMsg({ status, travelerQty }) {
  return (
    <View style={styles.quotationStatusMsgContainer}>
      <Text style={{ ...styles.quoteStatus, color: 'white' }}>
        {status === 'requested'
          ? 'Pending quotation request for '
          : 'Quotation recived for'}
        <Text style={styles.numberOfPeople}>
          {travelerQty} {travelerQty === 1 ? 'person' : 'people'}
        </Text>
      </Text>
    </View>
  );
}

function TripScroller({ icon, title, trips }) {
  return (
    <View style={styles.tripsHeaderAndScrollerContainer}>
      <TripsHeader icon={icon} title={title} />
      <HorizontalScrollView style={styles.scrollContainer}>{trips}</HorizontalScrollView>
    </View>
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
