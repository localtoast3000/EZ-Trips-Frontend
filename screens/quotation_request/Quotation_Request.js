import {
  Platform,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SliderBase,
  TextInput,
  Modal,
} from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Trip from '../../components/trip/trip';
import { getnbDays } from '../../assets/helpers';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Cross from '../../components/icons/cross';
import DateRangePicker from '../../components/date-range-picker/DateRangePicker';
import { serverURL } from '../../api/backend_request';

export default function Quotation_Request({ navigation, route: { params: props } }) {
  const loadedFonts = loadFonts();
  const { theme } = useTheme();
  const TOKEN = useSelector((state) => state.user.value.token);

  // ///// BUTTON TRAVELERS && DATEPICKER
  //fait apparaître / disparaître la Modal
  const [modalVisible, setModalVisible] = useState(false);

  const [nbTravelers, setnbTravelers] = useState(1);
  const [selectedRange, setRange] = useState({});
  const [value, setValue] = useState('');
  const [trip, setTrip] = useState(null);
  console.disableYellowBox = true;

  useEffect(() => {
    //fetch le trip grâce à l'id reçu en props
    fetch(`${serverURL}/trips/tripById/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTrip(data.trip);
        }
      });
  }, []);

  const handleconfirmButton = () => {
    if (trip) {
      fetch(`${serverURL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: TOKEN,
          trip: '6358edc49ced89a7026c3017',
          start: selectedRange.firstDate,
          end: selectedRange.secondDate,
          nbDays: getnbDays(selectedRange.firstDate, selectedRange.secondDate),
          nbTravelers: nbTravelers,
          comments: value,
          totalPrice: trip.program[0].price * nbTravelers,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            navigation.navigate({ name: 'NextStep', params: data });
          } else {
            console.log('no data result', data.error);
            setModalVisible(true);
          }
        });
    }
  };

  if (!loadedFonts) return <></>;

  ////////////////////////////////////////////////////////////MODAL FILTER - FUNCTIONS////////////////////////////////////////////////////////////
  //gère l'incrémentation du filter Nb Travelers
  const increment = () => setnbTravelers((c) => c + 1);
  const decrement = () => (nbTravelers > 1 ? setnbTravelers((c) => c - 1) : false);

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Quotation request</Text>
          </View>
          {trip ? (
            <Trip
              {...trip}
              containerStyles={styles.tripCardContainer}
              topElementsContainerStyles={styles.tripCardTopElementsContainer}
              countryStyles={styles.tripCardCountry}
              heartStyles={styles.tripCardheart}
              titleStyles={styles.tripCardTitle}
              dateStyles={styles.tripCardDate}
              priceStyles={styles.tripCardPrice}
            />
          ) : (
            false
          )}
          <View style={styles.numberTripsBtnsContainer}>
            <Text style={styles.numberTripsBtnsLabel}>Number of travelers</Text>
            <View style={styles.numberTripsBtnsWrapper}>
              <TouchableOpacity
                style={{
                  ...styles.numberTripsBtn,
                  ...styles.countButton,
                  marginRight: 20,
                }}
                onPress={() => decrement()}
              >
                <Text style={styles.numberTripsBtnTxt}>-</Text>
              </TouchableOpacity>
              <Text style={styles.numberTripsValue}>{nbTravelers}</Text>
              <TouchableOpacity
                style={{
                  ...styles.numberTripsBtn,
                  ...styles.countButton,
                  marginLeft: 20,
                }}
                onPress={() => increment()}
              >
                <Text style={styles.numberTripsBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.calendarContainer}>
            <DateRangePicker
              onSelectDateRange={(range) => {
                setRange(range);
              }}
              responseFormat='YYYY-MM-DD'
              minDate={moment().subtract(100, 'days')}
            />
          </View>
          <View>
            <TextInput
              style={styles.textArea}
              placeholder='Any additional infos you would like us to know (restricted diets, special demands...)?'
              name='email'
              onChangeText={(text) => setValue(text)}
              multiline={true}
              numberOfLines={1}
            />
            {modalVisible ? (
              <View style={styles.modal}>
                <Text style={styles.modalText}>
                  {' '}
                  There is a missing field, did you choose dates ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Cross color='red' />
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
            <TouchableOpacity
              style={{ ...styles.buttonConfirm, backgroundColor: theme.pa1 }}
              onPress={handleconfirmButton}
            >
              <Text style={styles.confirmBtnTxt}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 120 }}></View>
      </ScrollView>
      <BottomToolbar />
    </>
  );
}
