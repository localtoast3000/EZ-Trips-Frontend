import { View, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';
import SearchIcon from '../../../components/icons/SearchIcon';
import styles from './style.css';

export default function SearchInput({ onChange = () => null }) {
  const [searchInput, setSearchInput] = useState('');

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={{ ...styles.searchInput, width: Dimensions.get('window').width - 80 }}
        value={searchInput}
        placeholder='Where are you heading?'
        onChangeText={(value) => {
          setSearchInput(value);
          onChange(value);
        }}
      />
      <SearchIcon
        scale={0.4}
        color='black'
        stroke={3}
      />
    </View>
  );
}
