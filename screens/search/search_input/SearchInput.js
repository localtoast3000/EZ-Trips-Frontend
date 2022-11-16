import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import { useState, useEffect } from 'react';
import SearchIcon from '../../../components/icons/SearchIcon';
import styles from './style.css';
import { searchData } from '../../../api/backend_request';

export default function SearchInput({ onSearchResultsResived = () => null }) {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(false);
  const [keyboardAccept, setKeyboardAccept] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => setKeyboardAccept(true));
    return () => Keyboard.removeAllListeners('keyboardDidHide');
  }, []);

  useEffect(() => {
    if (!keyboardAccept) return;
    handleSubmit();
    setKeyboardAccept(false);
  }, [keyboardAccept]);

  const handleSubmit = () => {
    console.log({ searchInput });
    if (
      ['', false, null, undefined, 'undefined', 0].includes(searchInput) ||
      searchInput.length < 3
    ) {
      setError('Invalid country name');
      return;
    } else
      (async () => {
        const res = await searchData('/trips/searchbycountry/', {
          country: searchInput.trim(),
        });
        if (res.result) {
          setError(false);
          setSearchInput('');
          onSearchResultsResived(res.trips);
        } else setError('Invalid country name');
      })();
  };

  return (
    <>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={{ ...styles.searchInput, width: Dimensions.get('window').width - 80 }}
          value={searchInput}
          placeholder='Where are you heading ?'
          onChangeText={(value) => setSearchInput(value)}
        />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <SearchIcon
            scale={0.4}
            color='black'
            stroke={3}
          />
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#ff4949', marginTop: 5 }}>{error ? error : ''}</Text>
    </>
  );
}
