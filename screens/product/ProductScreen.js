import { View, Text, ImageBackground, TouchableOpacity, Modal } from 'react-native';

import styles from './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import React, { useState, useEffect } from 'react';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { serverURL } from '../../api/backend_request';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Cross from '../../components/icons/cross';
import ShowMore from 'react-native-show-more-button';
import Scroll from '../../components/icons/scrollDown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addFavorites, deleteFavorite } from '../../reducers/user';
import { getMonthName } from '../../lib/helpers';
import Slideshow from 'react-native-image-slider-show';
const iso = require('iso-3166-1');

export default function ProductScreen({ navigation, route: { params: props } }) {
  /* ---------------- INITIALISATION DES CONSTANTES ----------------  */
  const dispatch = useDispatch();
  //store toutes les données du trip fetché au chargement du composant
  const [trip, setTrip] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const loadedFonts = loadFonts();
  //fait apparaître / disparaître la Modal
  const [modalVisible, setModalVisible] = useState(false);
  //détermine le programme à display
  const [detailedProgram, setDetailedProgram] = useState(null);
  //gère les likes
  const [favorite, setFavorite] = useState(false);
  //Token utilisateur
  const TOKEN = useSelector((state) => state.user.value.token);

  /* ---------------- IMPORT DES PROPS A L'INITIALISATION DU COMPOSANT ----------------  */

  useEffect(() => {
    //importe l'état favorite du trip
    setFavorite(props.isFavorite);
    //fetch le trip grâce à l'id reçu en props

    fetch(`${serverURL}/trips/tripById/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTrip(data.trip);
        }
      });
  }, []);

  // fetch les coordonnées géographiques de la ville de départ du trip une fois le trip chargé dans le hook React
  useEffect(() => {
    if (trip) {
      //L'API OpenWeatherApp a besoin du Country Code pour faire sa recherche
      let countryCode = iso.whereCountry(trip.country).alpha2;
      //fetch avec le country code correspondant + la ville de départ
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${trip.addressDeparture},${countryCode}&appid=7cecadeb80528d114d059361830568c1`
      )
        .then((response) => response.json())
        .then((data) => {
          //stock la latitude et la longitude
          setLat(Number(data[0].lat));
          setLon(Number(data[0].lon));
        });
    }
  }, [trip]);

  if (!loadedFonts) return <></>;

  if (!trip) return <></>;

  /* ---------------- DECLARATION DES VARIABLES DYNAMIQUES ----------------  */
  const name = trip.name;
  const price = trip.program[0].price;
  const photos = trip.photos;
  const minDay = trip.program[0].nbday;
  const maxDay = trip.program[trip.program.length - 1].nbday;
  const startMonth = getMonthName(trip.travelPeriod[0].start);
  const endMonth = getMonthName(trip.travelPeriod[0].end);
  const heart = (
    <AntDesign
      name='heart'
      size={25}
      borderOuterOutlined='black'
      color={favorite ? 'red' : 'white'}
      // onPress={onHeartPress}
    />
  );
  /* --------------------------------- DISPLAY PROGRAM DYNAMICALLY ---------------------------------  */

  // to display buttons for programs
  // DISPLAY NBDAYS PROGRAM FORMAT BOUTON
  const nbDaysButtons = trip.program.map((data, i) => {
    return (
      <TouchableOpacity
        onPress={() => programSetter(data)}
        style={styles.nbDaysModal}
        key={i}
      >
        <Text>{data.nbday} days</Text>
      </TouchableOpacity>
    );
  });

  //selon le bouton cliqué, afficher le detailed program correspondant au nombre de jour du bouton
  const programSetter = (data) => {
    detailedProgram ? setDetailedProgram(null) : setDetailedProgram(data.nbday);
  };

  //displaying the right program dynamically.

  ///!\ goodProgram est asynchrone, s'il ne s'affiche pas encore programDisplay est une View vide (évite les bugs)
  const goodProgram = trip.program.find((e) => e.nbday === detailedProgram);
  let programDisplay = () => {
    return <View></View>;
  };
  if (goodProgram) {
    programDisplay = goodProgram.detailedProgram.map((day, i) => {
      return (
        <View key={i} style={styles.program}>
          <Text style={styles.programKey}>
            Day : <Text style={styles.programValue}>{day.day}</Text>
          </Text>
          <Text style={styles.programKey}>
            Activities : <Text style={styles.programValue}>{day.activities}</Text>
          </Text>
        </View>
      );
    });
  }

  /* ---------------- DISPLAY TAGS DYNAMICALLY ----------------  */

  const tags = trip.tags.map((data, i) => {
    return (
      <TouchableOpacity
        //  onPress={() => programDisplay(data)}
        style={styles.tagsModal}
        key={i}
      >
        <Text>{data}</Text>
      </TouchableOpacity>
    );
  });

  /* ---------------- DISPLAY INCLUDED / NON-INCLUDED DYNAMICALLY ----------------  */
  const included = trip.included.map((e, i) => {
    return <Text key={i}>{e}</Text>;
  });

  const nonIncluded = trip.nonIncluded.map((e, i) => {
    return <Text key={i}>{e}</Text>;
  });
  /* ---------------- HANDLE LIKE/UNLIKE DYNAMICALLY ----------------  */

  const handleLike = () => {
    if (favorite) {
      //supprime en BDD
      fetch(`${serverURL}/users/like`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TOKEN, tripID: props.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            //une fois supprimé en BDD, supprime dans le reducer
            dispatch(deleteFavorite(props.id));
            setFavorite(false);
          } else {
          }
        });
    } else {
      //rajout dans la BDD
      fetch(`${serverURL}/users/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TOKEN, tripID: props.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            //rajout dans le reducer
            dispatch(addFavorites(data.tripLiked));
            setFavorite(true);
          }
        });
    }
  };
  /* ---------------- PHOTOS CARROUSSEL ----------------  */

  let urls = [];
  let photoDisplayed = trip.photos.map((e, i) => {
    urls.push({ url: e });
  });

  return (
    <View style={styles.scrollView} key={props.propsKey}>
      {/* ---------------- LANDING PAGE PHOTO BACKGROUND + INFOS PRINCIPALES ---------------- */}
      <ImageBackground
        style={styles.landing}
        source={{ uri: trip.background }}
        resizeMode='cover'
      >
        <HeaderButtons
          favorite={favorite}
          onHeartPress={() => handleLike()}
          onCrossPress={() => navigation.navigate('Discover')}
          heartActiveColor='#F5612F'
          iconsColor='white'
        />
        {/* ---------------- RECAP TRIP  ---------------- */}
        <View style={styles.recapTripCard}>
          <Text style={styles.recapTriptitle}>{name}</Text>
          <Text style={styles.recapTripcountry}>{trip.country}</Text>
          {minDay == maxDay ? (
            <Text style={styles.recapTripDays}>{minDay} days</Text>
          ) : (
            <Text style={styles.recapTripDays}>
              From {minDay} days to {maxDay} days
            </Text>
          )}
          <Text style={styles.recapTripPrice}>Starting from {price}€ </Text>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsBtn}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.moreDetailsBtnTxt}>More details</Text>
          <Scroll />
        </TouchableOpacity>
      </ImageBackground>
      {/* ---------------- MODAL = FICHE PRODUIT ---------------- */}

      <Modal
        statusBarTranslucent={true}
        animationType='slide'
        visible={modalVisible}
        presentationStyle='fullScreen'
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <ScrollView style={styles.scrollViewModal}>
            {/* ---------------- ICONS TOP RIGHT ---------------- */}
            <HeaderButtons
              containerStyle={styles.carousselHeaderBtns}
              favorite={favorite}
              onHeartPress={() => handleLike()}
              onCrossPress={() => setModalVisible(!modalVisible)}
              heartActiveColor='#F5612F'
              iconsColor='white'
            />

            {/* ---------------- CAROUSSEL PHOTOS ---------------- */}

            <Slideshow
              scrollEnabled={false}
              height={250}
              style={styles.caroussel}
              dataSource={urls}
            />

            {/* ---------------- HEADER INFOS PRINCIPALES ---------------- */}
            <View name='infosModal' style={styles.modalInfoContainer}>
              {/* ---------------- HEADER TITRE + PAYS ---------------- */}
              <View style={styles.modalInfoHeaderWrapper}>
                <Text style={styles.modalInfoHeaderTitle}>{trip.name}</Text>
                <Text style={styles.modalInfoHeaderCountry}>{trip.country}</Text>
                <View style={styles.divider}></View>
              </View>
              {/* ---------------- CARTE INFOS ORANGE + PARTENAIRE ---------------- */}
              <View style={styles.infoContainerModal}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(196,107,77,0.65)',
                    padding: 10,
                    borderRadius: 15,
                  }}
                >
                  {minDay == maxDay ? (
                    <Text style={{ color: 'white' }}>{minDay} days</Text>
                  ) : (
                    <Text style={{ color: 'white' }}>
                      From {minDay} to {maxDay} days
                    </Text>
                  )}
                  <Text style={{ color: 'white' }}>
                    Travel period: {startMonth}
                    <Text> to {endMonth}</Text>
                  </Text>
                  <Text style={{ color: 'white' }}>Starting from {price} €</Text>
                </View>

                <View
                  style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
                >
                  <Text style={{ color: 'black' }}>
                    Offered by{' '}
                    <Text style={{ color: 'black', textDecoration: 'underline' }}>
                      EZTRIP
                    </Text>
                  </Text>
                </View>
              </View>
              {/* ---------------- INCLUDED/NOT INCLUDED ---------------- */}
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <View name='included' style={{ width: '50%', marginRight: 8 }}>
                  <Text style={styles.smallTitle}>Included :</Text>
                  <View style={{ width: '100%' }}>{included}</View>
                </View>

                <View name='nonIncluded' style={{ marginRight: 12, width: '50%' }}>
                  <Text style={styles.smallTitle}>Not included :</Text>
                  <View style={{ width: '100%' }}>{nonIncluded}</View>
                </View>
              </View>

              {/* ---------------- MAP LOCALISATION : Ne s'affiche que si lat et lon sont définies---------------- */}
              <View
                name='localisation'
                style={{ justifyContent: 'center', minHeight: 380, maxHeight: 380 }}
              >
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
                    }}
                  >
                    <Marker
                      coordinate={{ latitude: lat, longitude: lon }}
                      pinColor='#C46B4D'
                      title={`${trip.addressDeparture}, ${trip.country}`}
                    />
                  </MapView>
                ) : (
                  <View></View>
                )}
              </View>

              {/* ---------------- DESCRIPTION TRIP ---------------- */}
              {/* si on a le temps voir pour un "showmore"/"showless" pour pas avoir des descriptions a rallonge */}

              <Text style={styles.smallTitle}>Description :</Text>
              <ShowMore
                height={60}
                buttonColor={'#c46b4d'}
                showMoreText='Show more'
                showLessText='Show less'
              >
                <Text ellipsizeMode='tail' style={styles.inclusModal}>
                  {trip.description}
                </Text>
              </ShowMore>
              {/* ---------------- PROGRAMS ---------------- */}
              <Text style={styles.smallTitle}>Programs :</Text>
              <View style={styles.nbDaysContainer}>{nbDaysButtons}</View>
              <View>
                {detailedProgram ? (
                  <ShowMore
                    height={150}
                    buttonColor={'#c46b4d'}
                    showMoreText='Show more'
                    showLessText='Show less'
                  >
                    {programDisplay}
                  </ShowMore>
                ) : (
                  <View></View>
                )}
              </View>

              {/* ---------------- TAGS ---------------- */}

              <Text style={styles.smallTitle}>Tags :</Text>
              <View style={styles.tagsContainer}>{tags}</View>

              {/* ---------------- BOUTONS QUOTATION ET DOWNLOAD ---------------- */}

              <TouchableOpacity
                style={styles.quotationButton}
                onPress={() =>
                  navigation.navigate({
                    name: 'Quotation_Request',
                    params: { id: props.id },
                    merge: true,
                  })
                }
              >
                <Text style={styles.buttonTextQuotation}>Quotation request</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.programButton}>
                <Text style={styles.buttonTextProgram}>Download program (PDF)</Text>
              </TouchableOpacity>

              {/* ---------------- ALL THE CODE HAS TO GO OVER THIS LINE ---------------- */}
              {/* ---------------- FOOTER BOTTOM BAR ---------------- */}
              <View style={{ height: 90 }}></View>
            </View>
          </ScrollView>
        </View>
        <BottomToolbar></BottomToolbar>
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
      <TouchableOpacity style={styles.crossBtn} onPress={onCrossPress}>
        <Cross scale={1.2} color={iconsColor} style={styles.cross} />
      </TouchableOpacity>
    </View>
  );
}
