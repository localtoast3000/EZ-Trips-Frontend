import { ImageBackground, TouchableOpacity, View, Text } from 'react-native';
import styles from './style.css';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../reducers/user';

export default function Quote({
  travelerQty,
  travelPeriod,
  country,
  id,
  name,
  price,
  background,
  end,
  start,
  program,
  status,
  onPress = () => null,
  ...props
}) {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate({
          name: 'Quotation_Display',
          params: { id },
          merge: true,
        })
      }>
      <ImageBackground
        imageStyle={{ borderRadius: 15 }}
        source={{ uri: background }}
        style={styles.imageBackground}>
        <QuotationStatusMsg
          status={status}
          travelerQty={travelerQty}
        />
        <View style={styles.imageLayer}></View>
        <Text style={styles.country}>{country}</Text>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.bottomInfo}>
          <Text style={styles.date}>
            From {start} to {end}
          </Text>
          <Text style={styles.price}>
            Total price: <Text style={styles.boldText}>{price}</Text> €
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function QuotationStatusMsg({ status, travelerQty }) {
  return (
    <View style={styles.quotationStatusMsgContainer}>
      <Text style={{ ...styles.quoteStatus, color: 'white' }}>
        {status === 'Requested' ? 'Pending response for ' : 'Quotation recived for '}
        <Text style={styles.numberOfPeople}>
          {travelerQty} {travelerQty === 1 ? 'person' : 'people'}
        </Text>
      </Text>
    </View>
  );
}
