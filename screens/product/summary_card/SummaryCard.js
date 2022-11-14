import { View, Text } from 'react-native';
import styles from './style.css';

export default function SummaryCard({ minDay, maxDay, startMonth, endMonth, price }) {
  return (
    <View style={styles.infoContainerModal}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'rgba(196,107,77,0.65)',
          padding: 10,
          borderRadius: 15,
        }}
      >
        {minDay === maxDay ? (
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

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={{ color: 'black' }}>
          Offered by{' '}
          <Text style={{ color: 'black', textDecoration: 'underline' }}>EZ TRIPS</Text>
        </Text>
      </View>
    </View>
  );
}
