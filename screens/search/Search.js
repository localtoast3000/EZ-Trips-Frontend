import { Modal, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reducers/user';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Trip from '../../components/trip/trip';
import SearchInput from './search_input/SearchInput';
import ResultsAndFilterBtn from './results_and_filter_button/ResultsAndFilterButton';
import BudgetSection from './budget_section/BudgetSection';
import DateSection from './date_section/DateSection';
import TagsSection from './tags_section/TagsSection';
import SubmitSearch from './submit_search/SubmitSearch';
import CloseButton from '../../components/close_button/CloseButton';
import styles from './style.css';
import { headerScale } from '../../global/scales';
import { inspect } from '../../lib/inspector';

export default function Search({ navigation }) {
  const loadedFonts = loadFonts();
  const { favorites } = useSelector(selectUser);
  const [userMessage, setUserMessage] = useState('No search results');
  const [tripsData, setTripsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchBody, setSearchBody] = useState({
    minBudget: null,
    maxBudget: null,
    startMonth: null,
    endMonth: null,
    durationInDays: null,
    tags: null,
  });

  if (!loadedFonts) return <></>;

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <Text style={{ ...styles.header, ...headerScale }}>Search</Text>
        <SearchInput
          onSearchResultsResived={(searchResults) => setTripsData(searchResults)}
        />
        <ResultsAndFilterBtn
          tripsData={tripsData}
          onFilterBtnPress={() => setModalVisible(!modalVisible)}
        />
        {tripsData && tripsData.length > 0 ? (
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
          <View>
            <Text style={{ fontFamily: 'txt', fontSize: 16 }}>{userMessage}</Text>
          </View>
        )}
        <Modal
          transparent={true}
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
          statusBarTranslucent={true}>
          <View style={styles.modalContentContainer}>
            <ScrollView>
              <FilterModalHeader onClose={() => setModalVisible(!modalVisible)} />
              <BudgetSection
                onBudgetChange={([minBudget, maxBudget]) =>
                  setSearchBody({ ...searchBody, minBudget, maxBudget })
                }
              />
              <DateSection
                onDatesChange={([startDate, endDate]) =>
                  setSearchBody({
                    ...searchBody,
                    startMonth: startDate.month() + 1,
                    endMonth: endDate.month() + 1,
                    durationInDays: endDate.diff(startDate, 'days'),
                  })
                }
              />
              <TagsSection
                onTagListChange={(tags) => setSearchBody({ ...searchBody, tags })}
              />
              <SubmitSearch
                searchBody={searchBody}
                onSubmitSuccess={(trips) => {
                  setTripsData(trips);
                  setModalVisible(false);
                }}
              />
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
    <View style={styles.filterHeaderContainer}>
      <Text style={styles.filterHeader}>Filters</Text>
      <CloseButton
        onPress={onClose}
        iconColor={'black'}
        iconScale={0.5}
      />
    </View>
  );
}
