import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './reducers/user';
import Discover from './screens/discover/Discover';
import ProductScreen from './screens/product/ProductScreen';
import Search from './screens/search/Search';
import OnBoarding from './screens/on_boarding/OnBoarding';
import MyQuotations from './screens/myquotations/MyQuotations';
import NextStep from './screens/next_step/NextStep';
import Quotation_Request from './screens/quotation_request/Quotation_Request';
import Quotation_Display from './screens/quotation_display/Quotation_Display';
import Profile from './screens/profile/Profile';
import MyDocuments from './screens/mydocuments/MyDocuments';
import MyTrips from './screens/mytrips/MyTrips';
import { useNavigation, useRoute } from '@react-navigation/native';
import { inspect } from './lib/inspector';

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  const navigation = useNavigation();
  const { user } = useSelector(selectUser);
  const [onBoardingIsVisible, setOnBoardingIsVisible] = useState(true);

  useEffect(() => {
    console.log(user);
    if (user) return setOnBoardingIsVisible(false);
    setOnBoardingIsVisible(true);
  }, [user]);

  useEffect(() => {
    inspect(navigation.getState());
  }, [navigation]);

  useEffect(() => {
    if (onBoardingIsVisible) navigation.navigate('OnBoarding');
  }, [onBoardingIsVisible]);

  return (
    <Stack.Navigator
      initialRouteName='OnBoarding'
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      {onBoardingIsVisible && (
        <Stack.Screen
          name='OnBoarding'
          component={OnBoarding}
        />
      )}
      <Stack.Screen
        name='Discover'
        component={Discover}
      />
      <Stack.Screen
        name='Search'
        component={Search}
      />
      <Stack.Screen
        name='Quotation_Display'
        component={Quotation_Display}
      />
      <Stack.Screen
        name='Quotation_Request'
        component={Quotation_Request}
      />
      <Stack.Screen
        name='Product'
        component={ProductScreen}
      />
      <Stack.Screen
        name='MyQuotations'
        component={MyQuotations}
      />
      <Stack.Screen
        name='MyTrips'
        component={MyTrips}
      />
      <Stack.Screen
        name='NextStep'
        component={NextStep}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
      />
      <Stack.Screen
        name='MyDocuments'
        component={MyDocuments}
      />
    </Stack.Navigator>
  );
}
