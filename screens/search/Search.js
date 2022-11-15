import { TextInput, Modal, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reducers/user';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HorizontalCounter from '../../components/form_elements/horizontal_counter/HorizontalCounter';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Trip from '../../components/trip/trip';
import SearchInput from './search_input/SearchInput';
import ResultsAndFilterBtn from './results_and_filter_button/ResultsAndFilterButton';
import BudgetSection from './budget_section/BudgetSection';
import DateSection from './date_section/DateSection';
import TagsSection from './tags_section/TagsSection';
import SubmitSearch from './submit_search/SubmitSearch';
import { getData } from '../../api/backend_request';
import styles from './style.css';
import { headerScale } from '../../global/scales';

export default function Search({ navigation }) {
  const [tripsData, setTripsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, favorites } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const res = await getData('/trips');
      if (res.result) {
        setTripsData(res.trips);
      } else return console.log('Failed to fetch trips');
    })();
  }, []);

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <Text style={{ ...styles.header, ...headerScale }}>Search</Text>
        <SearchInput onChange={(value) => console.log(value)} />
        <ResultsAndFilterBtn
          tripsData={tripsData}
          onFilterBtnPress={() => setModalVisible(!modalVisible)}
        />
        {tripsData ? (
          tripsData.map((trip, i) => {
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
                  key={i}
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
          })
        ) : (
          <></>
        )}
        <Modal
          transparent={true}
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modal}>
            <FilterModalHeader onClose={() => setModalVisible(!modalVisible)} />
            <ScrollView
              style={{
                padding: 5,
                backgroundColor: '#F2F3F5',
                marginTop: 10,
                padding: 25,
                height: '100%',
              }}>
              <BudgetSection />
              <TravelerQtySection onValueChange={(count) => console.log(count)} />
              <DateSection />
              <TagsSection trips={tripsData} />
              <SubmitSearch />
              <View style={{ height: 400 }}></View>
            </ScrollView>
          </View>
        </Modal>
        <View style={{ height: 130 }}></View>
      </ScrollView>
      <BottomToolbar />
    </>
  );
}

function FilterModalHeader({ onClose }) {
  return (
    <View
      id='headerFilter'
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={{ fontFamily: 'txt', fontSize: 24 }}>Filters</Text>
      <AntDesign
        name='close'
        size={30}
        color='black'
        onPress={onClose}
      />
    </View>
  );
}

function TravelerQtySection({ onValueChange }) {
  return (
    <HorizontalCounter
      label='Travellers'
      onValueChange={onValueChange}
      initalValue={1}
      notSmallerThanInital={true}
    />
  );
}
