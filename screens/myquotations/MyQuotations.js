import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import HorizontalScrollView from '../../components/horzontal_scroll_view/HorizontalScrollView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Quote from './quote/Quote';
import styles from './style.css';
import { getData } from '../../api/backend_request';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reducers/user';
import { headerScale } from '../../global/scales';

export default function MyQuotations() {
  const loadedFonts = loadFonts();
  const { user } = useSelector(selectUser);
  const [requestSent, setRequestSent] = useState([]);
  const [quotationReceived, setQuotationReceived] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getData('/orders/' + user.token);
      if (res.result) {
        const totalRequests = [];
        const totalQuotations = [];
        for (let order of res.data) {
          if (
            order.status === 'Requested' &&
            !totalRequests.some((e) => e._id === order._id)
          ) {
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
      } else console.log('Failed to fetch orders');
    })();
  }, []);

  if (!loadedFonts) return <></>;

  let sentDisplay = <Text style={{ fontFamily: 'txt' }}>No quotation asked yet.</Text>;

  if (requestSent.length > 0) {
    sentDisplay = requestSent.map((data, i) => {
      let start = data.start.slice(5, 10);
      let end = data.end.slice(5, 10);

      return (
        <View
          key={i}
          style={styles.tripQuoteStatusContainer}>
          <Quote
            travelerQty={data.nbTravellers}
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
          />
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
        <View
          key={i}
          style={styles.tripQuoteStatusContainer}>
          <Quote
            travelerQty={data.nbTravellers}
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
          />
        </View>
      );
    });
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={{ ...styles.header, ...headerScale }}>My quotations</Text>
        <TripScroller
          title='Request sent'
          icon={
            <Ionicons
              name='send-outline'
              size={22}
              color={'black'}
            />
          }
          trips={sentDisplay}
        />
        <TripScroller
          title='Quotation received'
          icon={
            <Ionicons
              name='mail-unread-outline'
              size={24}
              color={'black'}
            />
          }
          trips={sentDisplay}
        />
        <View style={{ height: 100 }}></View>
      </View>
      <BottomToolbar />
    </>
  );
}

function TripScroller({ icon, title, trips }) {
  return (
    <View style={styles.tripsHeaderAndScrollerContainer}>
      <TripsHeader
        icon={icon}
        title={title}
      />
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
