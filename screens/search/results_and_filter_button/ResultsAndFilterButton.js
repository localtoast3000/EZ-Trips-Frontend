import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style.css';

export default function ResultsAndFilterBtn({ tripsData, onFilterBtnPress }) {
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
