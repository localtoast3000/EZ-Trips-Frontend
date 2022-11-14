import { ImageBackground, View, Text } from 'react-native';
import styles from './style.css';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, deleteFavorite } from '../../reducers/user';
import { postData, deleteData } from '../../api/backend_request';
import { getMonthName } from '../../lib/helpers';
import { selectUser } from '../../reducers/user';

export default function Trip({
  id,
  name,
  country,
  minPrice,
  background,
  isFavorite,
  travelPeriod,
  containerStyles,
  topElementsContainerStyles,
  countryStyles,
  heartStyles,
  titleStyles,
  dateStyles,
  priceStyles,
}) {
  const dispatch = useDispatch();
  const { user, favorites } = useSelector(selectUser);

  const handleLike = () => {
    if (favorites.some((favorite) => favorite === id)) {
      (async () => {
        const res = await deleteData('/users/like', {
          token: user.token,
          tripID: id,
        });
        if (res.result) dispatch(deleteFavorite(id));
      })();
    } else {
      (async () => {
        const res = await postData('/users/like', {
          token: user.token,
          tripID: id,
        });
        if (res.result) dispatch(addFavorites(id));
      })();
    }
  };

  return (
    <ImageBackground
      imageStyle={{ borderRadius: 15 }}
      source={{ uri: background }}
      style={{ ...styles.imageBackground, ...containerStyles }}
    >
      <View style={styles.imageLayer}></View>
      <View style={{ ...styles.topInfos, ...topElementsContainerStyles }}>
        <Text style={{ ...styles.country, ...countryStyles }}>{country}</Text>
        <AntDesign
          onPress={() => handleLike()}
          style={{ ...styles.heart, ...heartStyles }}
          name='heart'
          size={18}
          color={
            isFavorite ? '#F5612F' : isFavorite === undefined ? 'transparent' : 'white'
          }
        />
      </View>
      <Text style={{ ...styles.title, ...titleStyles }}>{name}</Text>
      <View style={styles.bottomInfo}>
        {travelPeriod && (
          <Text style={{ ...styles.date, ...dateStyles }}>
            From {getMonthName(travelPeriod[0].start)} to{' '}
            {getMonthName(travelPeriod[0].end)}
          </Text>
        )}
        {minPrice && (
          <Text style={{ ...styles.price, ...priceStyles }}>
            From <Text style={styles.boldText}>{minPrice}</Text> €
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}
