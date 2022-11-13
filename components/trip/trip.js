import { ImageBackground, TouchableOpacity, View, Text } from 'react-native';
import styles from './style.css';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, deleteFavorite } from '../../reducers/user';
import { serverURL } from '../../api/backend_request';
import { getMonthName } from '../../assets/helpers';

export default function Trip({
  containerStyles,
  topElementsContainerStyles,
  countryStyles,
  heartStyles,
  titleStyles,
  dateStyles,
  priceStyles,
  onPress = () => null,
  ...props
}) {
  //constantes générales
  const dispatch = useDispatch();
  const TOKEN = useSelector((state) => state.user.value.token);
  const navigation = useNavigation();
  let favorites = useSelector((state) => state.user.favorites);

  //constantes pour faciliter l'intégration des props
  //prends en compte le scénario de l'ajout de la carte via My Quotations (qui n'envoie pas les mêmes infos)
  let start = props.travelPeriod
    ? getMonthName(props.travelPeriod[0].start)
    : props.start;
  let end = props.travelPeriod ? getMonthName(props.travelPeriod[0].end) : props.end;
  let price = props.price ? props.price : props.program[0].price;

  //function to add the trip to the tripsLiked user database + adding it to the reducer
  const handleLike = () => {
    //si le like se trouve déjà dans le reducer (et donc en BDD), on le supprime
    if (favorites.some((favorite) => favorite === props.id)) {
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
          }
        });
    }

    //si le trip.id n'est pas trouvé, on le rajoute en BDD + dans le reducer favorite
    else {
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
            dispatch(addFavorites(props.id));
          } else {
            console.log(data.error);
          }
        });
    }
  };

  // ---------------- HANDLE NAVIGATION : TO PRODUCT SCREEN OR QUOTATION DISPLAY ----------------

  const handleNavigation = () => {
    //props.price est un props directement passé quand la carte display un order, et pas un trip. Quand c'est un trip, le price est accessible à trip.program[0].price.
    if (props.price) {
      navigation.navigate({
        name: 'Quotation_Display',
        params: { id: props.id },
        merge: true,
      });
    } else {
      navigation.navigate('Product', {
        propsKey: props.propsKey,
        key: props.propsKey,
        id: props.id,
        isFavorite: props.isFavorite,
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleNavigation();
        onPress();
      }}
    >
      <ImageBackground
        imageStyle={{ borderRadius: 15 }}
        source={{ uri: props.background }}
        style={{ ...styles.imageBackground, ...containerStyles }}
      >
        <View style={styles.imageLayer}></View>
        <View style={{ ...styles.topInfos, ...topElementsContainerStyles }}>
          <Text style={{ ...styles.country, ...countryStyles }}>{props.country}</Text>
          <AntDesign
            style={{ ...styles.heart, ...heartStyles }}
            name='heart'
            size={18}
            color={
              props.isFavorite
                ? '#F5612F'
                : props.isFavorite === undefined
                ? 'transparent'
                : 'white'
            }
            onPress={() => handleLike()}
          />
        </View>
        <Text style={{ ...styles.title, ...titleStyles }}>{props.name}</Text>
        <View style={styles.bottomInfo}>
          <Text style={{ ...styles.date, ...dateStyles }}>
            From {start} to {end}
          </Text>
          {props.price ? (
            <Text style={{ ...styles.price, ...priceStyles }}>
              Total price: <Text style={styles.boldText}>{price}</Text> €
            </Text>
          ) : (
            <Text style={{ ...styles.price, ...priceStyles }}>
              From <Text style={styles.boldText}>{price}</Text> €
            </Text>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
