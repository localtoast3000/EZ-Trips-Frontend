import { View, Text } from 'react-native';
import styles from './style.css';

export default function RecapTripCard({ name, country, minDay, maxDay, price }) {
  return (
    <View style={styles.container}>
      <Text style={styles.country}>{country}</Text>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.bottomInfo}>
        {minDay === maxDay ? (
          <Text style={styles.days}>{minDay} days</Text>
        ) : (
          <Text style={styles.days}>
            From {minDay} days to {maxDay} days
          </Text>
        )}
        <Text style={styles.price}>
          From <Text style={styles.boldText}>{price}€ </Text>
        </Text>
      </View>
    </View>
  );
}
