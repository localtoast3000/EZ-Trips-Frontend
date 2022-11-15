import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Trip from '../../components/trip/trip';
import { getnbDays } from '../../lib/helpers';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Cross from '../../components/icons/cross';
import DateRangePicker from '../../components/form_elements/date-range-picker/DateRangePicker';
import { serverURL } from '../../api/backend_request';
import HorizontalCounter from '../../components/form_elements/horizontal_counter/HorizontalCounter';

export default function Quotation_Request({ navigation, route: { params: props } }) {
  const loadedFonts = loadFonts();
  const { theme } = useTheme();
  const TOKEN = useSelector((state) => state.user.value.token);
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

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View>
            <Text style={{ ...styles.header, ...styles.headerBottomRow }}>Request</Text>
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
          <HorizontalCounter
            label='Number of travelers'
            onValueChange={(count) => setnbTravelers(count)}
            initalValue={1}
            notSmallerThanInital={true}
          />
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
                  }}>
                  <Cross color='red' />
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
            <TouchableOpacity
              style={{ ...styles.buttonConfirm, backgroundColor: theme.pa1 }}
              onPress={handleconfirmButton}>
              <Text style={styles.confirmBtnTxt}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 150 }}></View>
      </ScrollView>
      <BottomToolbar />
    </>
  );
}
