import { Text, TouchableOpacity } from 'react-native';
import { searchData } from '../../../api/backend_request';
import styles from './style.css';

export default function SubmitSearch({ searchBody, onSubmitSuccess }) {
  return (
    <TouchableOpacity
      style={styles.btnSearch}
      onPress={() =>
        (async () => {
          const res = await searchData(
            '/trips/filter/',
            // minBudget,
            // maxBudget,
            // searchInput,
            // startMonth: Number(startDate.split('-')[1]),
            // endMonth: Number(startDate.split('-')[1]),
            searchBody
          );
          if (res.result) {
            onSubmitSuccess(res.trips);
          } else console.log('Search submition failed');
        })()
      }>
      <Text style={styles.text}>Search results</Text>
    </TouchableOpacity>
  );
}
