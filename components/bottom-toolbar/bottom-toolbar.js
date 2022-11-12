import { TouchableHighlight, View, Dimensions, Pressable } from 'react-native';
import styles from './styles.css';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import SearchIcon from '../../components/icons/SearchIcon'
import UserIcon from '../../components/icons/UserIcon';
import DiscoverIcon from '../../components/icons/DiscoverIcon'
import HeartIcon from '../../components/icons/HeartIcon'
import DocumentIcon from '../../components/icons/DocumentIcon'


export default function BottomToolbar() {
  const navigation = useNavigation();
  const route = useRoute();





  return (

    <View style={styles.toolBar}>

      <DiscoverIcon
        stroke={4}
        scale={0.5}
        color={route.name === 'Discover' ? '#C46B4D' : 'black'}
        onPress={() => navigation.navigate('Discover')}
      />

      <HeartIcon

        stroke={4}
        scale={0.5}
        color={route.name === 'MyTrips' ? '#C46B4D' : 'black'}
        onPress={() => navigation.navigate('MyTrips')}
      />

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={styles.searchBtn}
        onPress={() => navigation.navigate('Search')}>
        <SearchIcon style={styles.icon} color={route.name === 'Search' ? '#C46B4D' : 'black'} scale={0.5} stroke={4} />
      </TouchableHighlight>

      <DocumentIcon
        color={route.name === 'MyQuotations' ? '#C46B4D' : 'black'}
        stroke={4}
        scale={0.5}
        onPress={() => navigation.navigate('MyQuotations')}
      />
      <UserIcon
        color={route.name === 'User' ? '#C46B4D' : 'black'}
        stroke={4}
        scale={0.5}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>


  );
}
