import { ScrollView, View, Text, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  convertibleStartDate,
  convertibleEndDate,
  getnbDays,
  getNbNights,
} from '../../lib/helpers';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Contact from '../../components/icons/contact';
import styles from './style.css';
import Trip from '../../components/trip/trip';
import { serverURL } from '../../api/backend_request';

export default function Quotation_Display({ navigation, route }) {
  const [order, setOrder] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nbDays, setNbDays] = useState(null);
  const [nbNights, setNbNights] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${serverURL}/orders/offer/${route.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setOrder(data.data);
          setStartDate(convertibleStartDate(data.data.start));
          setEndDate(convertibleEndDate(data.data.end));
          setNbDays(getnbDays(data.data.start, data.data.end));
          setNbNights(getNbNights(data.data.start, data.data.end));
          setStatus(data.data.status);
        }
      });
  }, []);

  const handleButtonReceived = () => {
    fetch(`${serverURL}/orders/updateStatus/${route.params.id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setStatus(data.status);
        }
      });
  };
  // --------------------- Pour appeler un numéro au clic sur contact EZ-TRIP ---------------------
  const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.header}>Destination</Text>
        {order ? (
          <Trip
            {...order.trip}
            containerStyles={styles.tripCardContainer}
            topElementsContainerStyles={styles.tripCardTopElementsContainer}
            countryStyles={styles.tripCardCountry}
            heartStyles={styles.tripCardheart}
            titleStyles={styles.tripCardTitle}
            dateStyles={styles.tripCardDate}
            priceStyles={styles.tripCardPrice}
          />
        ) : (
          <></>
        )}
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              status === 'Requested'
                ? styles.requested
                : status === 'Received'
                ? styles.received
                : styles.validated,
            ]}
          >
            {' '}
            Quotation status : <Text style={{ fontFamily: 'txtBold' }}>
              {status}
            </Text>{' '}
          </Text>
        </View>
        {order ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.smallTitle}> Summary :</Text>
            <Text style={styles.recapTravel}>
              • {nbDays} days {nbNights} nights
            </Text>
            <Text style={styles.recapTravel}>• {order.nbTravelers} travelers</Text>
            <Text style={styles.recapTravel}>
              • From {startDate} to {endDate}
            </Text>
            <Text style={styles.recapTravel}>• Special requests :</Text>
            <Text
              style={[
                styles.recapTravel,
                {
                  fontSize: 14,
                  fontFamily: 'txtItalic',
                  backgroundColor: 'white',
                  borderRadius: 15,
                  padding: 10,
                  paddingTop: 15,
                  alignItems: 'center',
                  display: 'flex',
                },
              ]}
            >
              {order.comments}
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        {order ? (
          <View style={styles.totalCostContainer}>
            <Text style={styles.totalCostTitle}> Total cost : </Text>
            <Text style={styles.cost}> {order.totalPrice} € including taxes </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.buttonsContainer}>
          {order ? (
            <TouchableOpacity
              style={styles.programButton}
              onPress={() => Linking.openURL(`${order.trip.program[0].programPDF}`)}
            >
              <Text style={styles.textButtons}> Download program (PDF)</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {status === 'Received' ? (
            <TouchableOpacity
              style={styles.validationButton}
              onPress={handleButtonReceived}
            >
              <Text style={styles.textButtons}> Accept quotation</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.validationButton}
              onPress={() => navigation.navigate({ name: 'MyQuotations' })}
            >
              <Text style={styles.textButtons}> Go back to your quotations</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.contact} onPress={() => dialCall('0650388510')}>
            <Contact style={styles.contactIcon} />
            <Text style={styles.textContact}> Contact EZ-TRIP </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 130 }}></View>
      </ScrollView>
      <BottomToolbar />
    </>
  );
}
