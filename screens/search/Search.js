import {
  TextInput,
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './style.css';
import { searchData, getData } from '../../api/backend_request';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import DateRangePicker from '../../components/form_elements/date-range-picker/DateRangePicker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchIcon from '../../components/icons/SearchIcon';
import HorizontalRangeSlider from '../../components/form_elements/HorizontalRangeSlider';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reducers/user';
import HorizontalCounter from '../../components/form_elements/horizontal_counter/HorizontalCounter';
import { inspect } from '../../lib/inspector';

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
        <Text style={styles.header}>Search</Text>
        <SearchInput />
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
              <TravellerQtySection />
              <DatesSection />
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

function SearchInput() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={{ ...styles.searchInput, width: Dimensions.get('window').width - 80 }}
        value={searchInput}
        placeholder='Where are you heading?'
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <SearchIcon
        scale={0.4}
        color='black'
        stroke={3}
      />
    </View>
  );
}

function ResultsAndFilterBtn({ tripsData, onFilterBtnPress }) {
  return (
    <View style={styles.resultsCounterAndFilterIconContainer}>
      <Text style={styles.text}>{tripsData ? tripsData.length : 0} results</Text>
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={onFilterBtnPress}>
        <AntDesign
          name='filter'
          size={22}
          color='black'
        />
      </TouchableOpacity>
    </View>
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

function BudgetSection() {
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(8000);

  const budgetChange = (value) => {
    setMinBudget(value[0]);
    setMaxBudget(value[1]);
  };

  return (
    <View>
      <Text style={styles.filterText}>Budget</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <View name='field'>
          <Text>Min</Text>
          <TextInput placeholder='0'>{minBudget}</TextInput>
        </View>
        <View name='field'>
          <Text>Max</Text>
          <TextInput placeholder='8000'>{maxBudget}</TextInput>
        </View>
      </View>

      <HorizontalRangeSlider
        min={300}
        max={8000}
        step={100}
        minimumRange={50}
        onValueChange={budgetChange}
        overides={{
          outboundColor: 'grey',
          inboundColor: '#C46B4D',
          thumbTintColor: '#C46B4D',
          thumbStyle: { margin: 20 },
          trackHeight: 3,
          thumbSize: 16,
          style: { margin: 10 },
        }}
      />
    </View>
  );
}

function TravellerQtySection() {
  const [nbTravelers, setnbTravelers] = useState(1);

  return (
    <HorizontalCounter
      label='Travellers'
      onValueChange={(count) => setnbTravelers(count)}
      initalValue={1}
      notSmallerThanInital={true}
    />
  );
}

function DatesSection() {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <View
      name='calendarSection'
      style={calendarVisible ? styles.bigCalendar : styles.smallCalendar}>
      <Text style={styles.filterText}>Departure dates</Text>

      <View
        name='dateInput'
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          width: '90%',
        }}>
        <Text style={{ fontFamily: 'txt' }}>Start:</Text>
        <TouchableOpacity
          style={{
            width: '30%',
            height: '100%',
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
          onPress={() => setCalendarVisible(!calendarVisible)}>
          <Text>{startDate}</Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'txt' }}>End:</Text>
        <TouchableOpacity
          style={{
            width: '30%',
            height: '100%',
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
          onPress={() => setCalendarVisible(!calendarVisible)}>
          <Text>{endDate}</Text>
        </TouchableOpacity>
      </View>

      {calendarVisible ? (
        <View style={styles.calendar}>
          <DateRangePicker
            onSelectDateRange={(range) => {
              setStartDate(range.firstDate);
              setEndDate(range.secondDate);
              setCalendarVisible(false);
            }}
            backgroundColor='white'
            responseFormat='DD-MM-YYYY'
            maxDate={moment().add(3, 'years')}
            minDate={moment()}
          />
        </View>
      ) : (
        false
      )}
    </View>
  );
}

function TagsSection({ trips }) {
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);

  useEffect(() => {
    let availableTags = [];
    trips.forEach((trip) => availableTags.push(...trip.tags));
    setTags(availableTags);
  }, [trips]);

  useEffect(() => {
    inspect(chosenTags);
  }, [chosenTags]);

  const addToChosenTags = (label) => {
    if (chosenTags.includes(label)) return;
    setChosenTags([...chosenTags, label]);
  };

  const removeFromChosenTags = (label) => {
    setChosenTags(chosenTags.filter((tag) => tag !== label));
  };

  return (
    <View style={styles.smavailableTagsection}>
      <Text style={styles.filterText}>What are you looking for?</Text>
      <Text style={{ fontFamily: 'txt', fontSize: 12, marginTop: 10 }}>
        popular tags:
      </Text>
      <PopularTags
        add={addToChosenTags}
        remove={removeFromChosenTags}
        tags={tags}
      />
      <ChosenTags
        add={addToChosenTags}
        remove={removeFromChosenTags}
        chosenTags={chosenTags}
      />
    </View>
  );
}

function PopularTags({ add, remove, tags }) {
  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, i) => {
        if (i > 6) return;
        return (
          <Tag
            key={i}
            label={tag}
            disabled={true}
            onSelectChange={(label, selected) => {
              selected ? add(label) : remove(label);
            }}
          />
        );
      })}
    </View>
  );
}

function ChosenTags({ add, remove, chosenTags }) {
  return (
    <View style={styles.tagsContainer}>
      {chosenTags.map((tag, i) => {
        return (
          <Tag
            key={i}
            label={tag}
            onSelectChange={(label, selected) => {
              selected ? add(label) : remove(label);
            }}
          />
        );
      })}
    </View>
  );
}

function Tag({ label, disabled, onSelectChange = () => null }) {
  const [selected, setSelected] = useState(false);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    if (rendering) return setRendering(false);
    onSelectChange(label, selected);
  }, [selected]);

  return (
    <TouchableOpacity
      onPress={() => {
        selected ? setSelected(false) : setSelected(true);
      }}
      style={
        disabled
          ? { ...styles.tags, backgroundColor: 'white' }
          : selected
          ? { ...styles.tags, backgroundColor: '#C46B4D' }
          : { ...styles.tags, backgroundColor: 'white' }
      }>
      <Text
        style={
          disabled
            ? { color: 'black' }
            : selected
            ? { color: 'white' }
            : { color: 'black' }
        }>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function SubmitSearch({ searchBody }) {
  return (
    <TouchableOpacity
      style={styles.btnSearch}
      onPress={() =>
        (async () => {
          const res = await searchData(
            '/trips/filter/',
            // minBudget,
            // maxBudget,
            // searchInput,
            // startMonth: Number(startDate.split('-')[1]),
            // endMonth: Number(startDate.split('-')[1]),
            searchBody
          );
          if (res.result) {
            setTripsData(res.trips);
          } else console.log('Failed to search');
          setModalVisible(false);
        })()
      }>
      <Text style={styles.text}>Search results</Text>
    </TouchableOpacity>
  );
}
