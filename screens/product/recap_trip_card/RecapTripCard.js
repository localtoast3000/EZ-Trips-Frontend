import { View, Text } from 'react-native';
import styles from './style.css';

export default function RecapTripCard({ name, country, minDay, maxDay, price }) {
  return (
    <View style={styles.recapTripCard}>
      <Text style={styles.recapTriptitle}>{name}</Text>
      <Text style={styles.recapTripcountry}>{country}</Text>
      {minDay === maxDay ? (
        <Text style={styles.recapTripDays}>{minDay} days</Text>
      ) : (
        <Text style={styles.recapTripDays}>
          From {minDay} days to {maxDay} days
        </Text>
      )}
      <Text style={styles.recapTripPrice}>Starting from {price}€ </Text>
    </View>
  );
}
