import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import styles from './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { getData, postData, deleteData } from '../../api/backend_request';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Cross from '../../components/icons/cross';
import Scroll from '../../components/icons/scrollDown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addFavorites, deleteFavorite, selectUser } from '../../reducers/user';
import { getMonthName } from '../../lib/helpers';
import Slideshow from 'react-native-image-slider-show';
import ShowMore from 'react-native-show-more-button';
import { getPositionData } from '../../api/open_weather_map';
import RecapTripCard from './recap_trip_card/RecapTripCard';
import ProgramSection from './program_section/ProgramSection';
import { headerScale } from '../../global/scales';
import SummaryCard from './summary_card/SummaryCard';

export default function ProductScreen({ navigation, route: { params: props } }) {
  const loadedFonts = loadFonts();
  const dispatch = useDispatch();
  const [trip, setTrip] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, favorites } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const res = await getData('/trips/tripById/' + props._id);
      if (res.result) setTrip(res.trip);
    })();
  }, []);

  useEffect(() => {
    if (trip) {
      (async () => {
        const res = await getPositionData(trip.addressDeparture, trip.country);
        if (res) {
          setLat(Number(res[0].lat));
          setLon(Number(res[0].lon));
        }
      })();
    }
  }, [trip]);

  if (!loadedFonts) return <></>;
  if (!trip) return <></>;

  const handleLike = () => {
    if (favorites.some((favorite) => favorite === props._id)) {
      (async () => {
        const res = await deleteData('/users/like', {
          token: user.token,
          tripID: props._id,
        });
        if (res.result) dispatch(deleteFavorite(props._id));
      })();
    } else {
      (async () => {
        const res = await postData('/users/like', {
          token: user.token,
          tripID: props._id,
        });
        if (res.result) dispatch(addFavorites(props._id));
      })();
    }
  };

  const summary = {
    name: trip.name,
    price: trip.program[0].price,
    photos: trip.photos,
    minDay: trip.program[0].nbday,
    maxDay: trip.program[trip.program.length - 1].nbday,
    startMonth: getMonthName(trip.travelPeriod[0].start),
    endMonth: getMonthName(trip.travelPeriod[0].end),
  };

  return (
    <View style={styles.scrollView}>
      <ImageBackground
        style={styles.landing}
        source={{ uri: trip.background }}
        resizeMode='cover'>
        <HeaderButtons
          favorite={favorites.some((favorite) => favorite === props._id)}
          onHeartPress={() => handleLike()}
          onCrossPress={() => navigation.navigate('Discover')}
          heartActiveColor='#F5612F'
          iconsColor='white'
        />
        <RecapTripCard {...summary} />
        <MoreDetailsButton onPress={() => setModalVisible(!modalVisible)} />
      </ImageBackground>
      <Modal
        statusBarTranslucent={true}
        animationType='slide'
        visible={modalVisible}
        presentationStyle='fullScreen'
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <ScrollView style={styles.scrollViewModal}>
            <HeaderButtons
              containerStyle={styles.carousselHeaderBtns}
              favorite={favorites.some((favorite) => favorite === props._id)}
              onHeartPress={() => handleLike()}
              onCrossPress={() => setModalVisible(!modalVisible)}
              heartActiveColor='#F5612F'
              iconsColor='white'
            />
            <Slideshow
              scrollEnabled={false}
              height={250}
              style={styles.caroussel}
              dataSource={trip.photos.map((photo) => ({ url: photo }))}
            />
            <View style={styles.modalInfoContainer}>
              <ModalHeader
                header={trip.name}
                country={trip.country}
              />
              <SummaryCard {...summary} />
              <IncludedNotIncludedColumns trip={trip} />
              <LocationMap
                trip={trip}
                lat={lat}
                lon={lon}
              />
              <DescriptionSection trip={trip} />
              <ProgramSection trip={trip} />
              <Tags trip={trip} />
              <TouchableOpacity
                style={styles.quotationButton}
                onPress={() =>
                  navigation.navigate({
                    name: 'Quotation_Request',
                    params: { id: props._id },
                    merge: true,
                  })
                }>
                <Text style={styles.buttonTextQuotation}>Quotation request</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.programButton}>
                <Text style={styles.buttonTextProgram}>Download program (PDF)</Text>
              </TouchableOpacity>
              <View style={{ height: 90 }}></View>
            </View>
          </ScrollView>
        </View>
        <BottomToolbar />
      </Modal>
    </View>
  );
}

function HeaderButtons({
  containerStyle,
  heartActiveColor,
  onHeartPress,
  onCrossPress,
  iconsColor,
  favorite,
}) {
  return (
    <View style={{ ...styles.headerButtons, ...containerStyle }}>
      <TouchableOpacity style={styles.heartBtn}>
        <AntDesign
          name='heart'
          size={25}
          borderOuterOutlined='black'
          color={favorite ? heartActiveColor : iconsColor}
          onPress={onHeartPress}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.crossBtn}
        onPress={onCrossPress}>
        <Cross
          scale={1.2}
          color={iconsColor}
          style={styles.cross}
        />
      </TouchableOpacity>
    </View>
  );
}

function MoreDetailsButton({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.moreDetailsBtn}
      onPress={onPress}>
      <Text style={styles.moreDetailsBtnTxt}>More details</Text>
      <Scroll />
    </TouchableOpacity>
  );
}

function ModalHeader({ header, country }) {
  return (
    <View style={styles.modalInfoHeaderWrapper}>
      <Text
        style={{
          ...styles.modalInfoHeaderTitle,
          fontSize: Dimensions.get('window').width / 10,
        }}>
        {header}
      </Text>
      <Text style={styles.modalInfoHeaderCountry}>{country}</Text>
      <View style={styles.divider}></View>
    </View>
  );
}

function IncludedNotIncludedColumns({ trip }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View
        name='included'
        style={{ width: '50%', marginRight: 8 }}>
        <Text style={styles.smallTitle}>Included :</Text>
        <View style={{ width: '100%' }}>
          {trip.included.map((e, i) => {
            return <Text key={i}>{e}</Text>;
          })}
        </View>
      </View>

      <View
        name='nonIncluded'
        style={{ marginRight: 12, width: '50%' }}>
        <Text style={styles.smallTitle}>Not included :</Text>
        <View style={{ width: '100%' }}>
          {trip.nonIncluded.map((e, i) => {
            return <Text key={i}>{e}</Text>;
          })}
        </View>
      </View>
    </View>
  );
}

function LocationMap({ trip, lat, lon }) {
  return (
    <View
      name='localisation'
      style={{ justifyContent: 'center', minHeight: 380, maxHeight: 380 }}>
      <Text style={styles.smallTitle}>Localisation:</Text>
      <Text>
        Departure from {trip.addressDeparture}, {trip.country}.
      </Text>
      {lat && lon ? (
        <MapView
          zoomTapEnabled={true}
          zoomEnabled={true}
          scrollEnabled={false}
          loadingBackgroundColor='#C46B4D'
          tintColor='#C46B4D'
          style={styles.map}
          mapType='hybrid'
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 1.5,
            longitudeDelta: 1.4,
          }}>
          <Marker
            coordinate={{ latitude: lat, longitude: lon }}
            pinColor='#C46B4D'
            title={`${trip.addressDeparture}, ${trip.country}`}
          />
        </MapView>
      ) : (
        <></>
      )}
    </View>
  );
}

function DescriptionSection({ trip }) {
  return (
    <>
      <Text style={styles.smallTitle}>Description :</Text>
      <ShowMore
        height={60}
        buttonColor={'#c46b4d'}
        showMoreText='Show more'
        showLessText='Show less'>
        <Text
          ellipsizeMode='tail'
          style={styles.inclusModal}>
          {trip.description}
        </Text>
      </ShowMore>
    </>
  );
}

function Tags({ trip }) {
  return (
    <>
      <Text style={styles.smallTitle}>Tags :</Text>
      <View style={styles.tagsContainer}>
        {trip.tags.map((data, i) => (
          <TouchableOpacity
            style={styles.tagsModal}
            key={i}>
            <Text>{data}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
