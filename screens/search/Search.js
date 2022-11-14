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
import { serverURL } from '../../api/backend_request';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import DateRangePicker from 'rnv-date-range-picker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchIcon from '../../components/icons/SearchIcon';
import { RangeSlider } from '@sharcoux/slider';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useSelector } from 'react-redux';

export default function Search({ navigation }) {
  const [tripsData, setTripsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(8000);
  const [nbTravelers, setnbTravelers] = useState(1);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dropdownTagVisible, setDropdownTagVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  //redux store pour récupérer les favoris et gérer la couleur du coeur
  const favorites = useSelector((state) => state.user.favorites);

  //GET ALL THE TRIPS WHEN LOADING THE SCREEN
  useEffect(() => {
    fetch(`${serverURL}/trips`)
      .then((response) => response.json())
      .then((data) => {
        setTripsData(data.trips);
        const tripData = [];
        //add the tags to the hook allTags
        data.trips.map((trip) => {
          trip.tags.map((tag) => {
            if (!tripData.find((e) => e === tag)) {
              tripData.push(tag);
            }
          });
        });
        setAllTags(tripData);
      });
  }, []);

  //S'assure que la police est bien chargée
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  //variable déclarée, mais assignée que si tripsData est bien récupéré du back pour éviter les bugs
  let trips;
  //MAP TO DISPLAY ALL THE TRIPS
  if (tripsData) {
    trips = tripsData.map((data, i) => {
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
          propsKey={i}
          {...data}
          isFavorite={favorites.some((favorite) => favorite === data._id)}
        />
      );
    });
  }

  const handleSearch = () => {
    const startMonth = startDate.slice(3, 5);
    const endMonth = endDate.slice(3, 5);

    //construit un objet regroupant tous les paramètres de filtres
    let research = { minBudget, maxBudget, searchInput, startMonth, endMonth };

    //construit l'URL avec les query correspondants aux filtres
    var url = new URL(`${serverURL}/trips/filter`);
    Object.keys(research).forEach((key) => url.searchParams.append(key, research[key]));

    //fetch avec l'URL personnalisé à la recherche
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTripsData(data.trips);
        setModalVisible(false);
      });
  };

  const increment = () => setnbTravelers((c) => c + 1);
  const decrement = () => (nbTravelers > 1 ? setnbTravelers((c) => c - 1) : false);

  //fonction qui s'exécute quand le slider Budget est bougé et change les inputs min et max budget
  const budgetChange = (value) => {
    setMinBudget(value[0]);
    setMaxBudget(value[1]);
  };

  //fonction pour ajouter le tag sélectionné au tableau SelectedTags
  const addTag = (item) => {
    if (item) {
      if (!selectedTags.some((e) => e.id == item.id)) {
        setSelectedTags([...selectedTags, item]);
      } else {
        // setSelectedTags(selectedTags.filter(e => e.title == tag.title))
      }
    } else {
      console.log('no tag selected');
      return;
    }
  };

  //dataset displayed dans le tag dropdown menu. Attribue un ID à chacun des tags => source à partir de laquelle on travaille pour la suite.
  let dataset = [];
  if (allTags.length != 0) {
    allTags.map((tag, i) => dataset.push({ id: i + 1, title: tag }));
  }

  //display les boutons tags : cinq "tags populaires" (les 5 premiers du dataset) puis les tags de SelectedTags
  const allTagsDisplay = dataset.map((e, i) => {
    //Gère la couleur du bouton tag en fonction de s'il est sélectionné ou non
    const selected = selectedTags ? selectedTags.some((tag) => tag.id === e.id) : false;
    //affiche les tags populaires
    if (i < 6) {
      return (
        <TouchableOpacity
          onPress={() => addTag(e)}
          //la couleur du bouton dépend de si le tag est sélectionné ou pas dans SelectedTags
          style={
            selected
              ? { ...styles.tags, backgroundColor: '#C46B4D' }
              : { ...styles.tags, backgroundColor: 'white' }
          }
          key={i}
        >
          <Text>{e.title}</Text>
        </TouchableOpacity>
      );
    }
    //affiche les tags sélectionnés
    else {
      if (selectedTags.some((tag) => tag.id === e.id)) {
        return (
          <TouchableOpacity
            onPress={() => addTag(e)}
            //la couleur du bouton dépend de si le tag est sélectionné ou pas dans SelectedTags
            style={
              selected
                ? { ...styles.tags, backgroundColor: '#C46B4D' }
                : { ...styles.tags, backgroundColor: 'white' }
            }
            key={i}
          >
            <Text>{e.title}</Text>
          </TouchableOpacity>
        );
      }
    }
  });

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.header}>Search</Text>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={{ ...styles.searchInput, width: Dimensions.get('window').width - 80 }}
            value={searchInput}
            placeholder='Where are you heading?'
            onChange={(e) => setSearchInput(e.target.value)}
          ></TextInput>
          <SearchIcon scale={0.4} color='black' stroke={3} />
        </View>

        <View style={styles.resultsCounterAndFilterIconContainer}>
          <Text style={styles.text}>{tripsData ? tripsData.length : 0} results</Text>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name='filter' size={22} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.tripContainer}>{tripsData ? trips : <View></View>}</View>
        <Modal
          transparent={true}
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal}>
            <View
              id='headerFilter'
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontFamily: 'txt', fontSize: 24 }}>Filters</Text>
              <AntDesign
                name='close'
                size={30}
                color='black'
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>

            <ScrollView
              id='ScrollviewFilters'
              style={{
                padding: 5,
                backgroundColor: '#F2F3F5',
                marginTop: 10,
                padding: 25,
                height: '100%',
              }}
            >
              <View name='sectionBudget'>
                <Text style={styles.filterText}>Budget</Text>
                <View
                  name='sectionContent'
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}
                >
                  <View name='field'>
                    <Text>Min</Text>
                    <TextInput placeholder='0'>{minBudget}</TextInput>
                  </View>
                  <View name='field'>
                    <Text>Max</Text>
                    <TextInput placeholder='8000'>{maxBudget}</TextInput>
                  </View>
                </View>

                <View name='' style={{ padding: 9 }}>
                  <RangeSlider
                    range={[0, 8000]} // set the current slider's value
                    minimumValue={0} // Minimum value
                    maximumValue={7000} // Maximum value
                    step={100} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                    minimumRange={50} // Minimum range between the two thumbs
                    crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
                    outboundColor='#FFEAE3' // The track color outside the current range value
                    inboundColor='#C46B4D' // The track color inside the current range value
                    thumbTintColor='#C46B4D' // The color of the slider's thumb
                    thumbStyle={undefined} // Override the thumb's style
                    trackStyle={undefined} // Override the tracks' style
                    minTrackStyle={undefined} // Override the tracks' style for the minimum range
                    midTrackStyle={undefined} // Override the tracks' style for the middle range
                    maxTrackStyle={undefined} // Override the tracks' style for the maximum range
                    vertical={false} // If true, the slider will be drawn vertically
                    inverted={false} // If true, min value will be on the right, and max on the left
                    enabled={true} // If false, the slider won't respond to touches anymore
                    trackHeight={2} // The track's height in pixel
                    thumbSize={18} // The thumb's size in pixel
                    thumbImage={undefined} // An image that would represent the thumb
                    slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
                    onValueChange={budgetChange} // Called each time the value changed. The type is (range: [number, number]) => void
                    onSlidingStart={undefined} // Called when the slider is pressed. The type is (range: [number, number]) => void
                    onSlidingComplete={undefined} // Called when the press is released. The type is (range: [number, number]) => void
                  />
                </View>
              </View>

              <View
                name='travelersSection'
                style={{
                  marginTop: 30,
                  marginBottom: 30,
                  height: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.filterText}>Number of travelers</Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '20%',
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    title='Decrement'
                    onPress={() => decrement()}
                  >
                    <Text style={{ textAlign: 'center', color: 'black' }}>-</Text>
                  </TouchableOpacity>
                  <Text>{nbTravelers}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    title='Increment'
                    onPress={() => increment()}
                  >
                    <Text style={{ textAlign: 'center', color: 'black' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                name='calendarSection'
                style={calendarVisible ? styles.bigCalendar : styles.smallCalendar}
              >
                <Text style={styles.filterText}>Departure dates</Text>

                <View
                  name='dateInput'
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    width: '90%',
                  }}
                >
                  <Text style={{ fontFamily: 'txt' }}>Start:</Text>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      height: '100%',
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.5,
                    }}
                    onPress={() => setCalendarVisible(!calendarVisible)}
                  >
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
                    onPress={() => setCalendarVisible(!calendarVisible)}
                  >
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

              <View
                name='tagsSection'
                style={dropdownTagVisible ? styles.bigTagSection : styles.smallTagSection}
              >
                <Text style={styles.filterText}>What are you looking for?</Text>
                <AutocompleteDropdown
                  clearOnFocus={true}
                  closeOnBlur={true}
                  onBlur={() => {
                    setDropdownTagVisible(false);
                  }}
                  onChevronPress={() => {
                    setDropdownTagVisible(!dropdownTagVisible);
                  }}
                  closeOnSubmit={true}
                  initialValue={''}
                  onSelectItem={(item) => {
                    item && addTag(item);
                  }}
                  dataSet={dataset}
                  direction={Platform.select({ ios: 'down', android: 'down' })}
                  textInputProps={{
                    placeholder: 'Search tags',
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: {
                      color: 'grey',
                      paddingLeft: 18,
                    },
                  }}
                />
                <Text style={{ fontFamily: 'txt', fontSize: 12, marginTop: 10 }}>
                  popular tags:
                </Text>
                <View style={styles.tagsContainer}>{allTagsDisplay}</View>
              </View>

              <TouchableOpacity
                style={styles.btnSearch}
                onPress={() => handleSearch(minBudget, maxBudget, nbTravelers)}
              >
                <Text style={styles.text}>Search results</Text>
              </TouchableOpacity>
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
