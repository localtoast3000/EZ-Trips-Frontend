import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './theme/theme';
import { selectTheme } from './reducers/theme';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationStack from './NavigationStack';
import { LogBox } from 'react-native';
function App() {
  const theme = useSelector(selectTheme);
  LogBox.ignoreAllLogs();
  console.disableYellowBow=true;
  
  return (
    <NavigationContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
      <PersistGate persistor={persistor}>
        <NavigationStack />
      </PersistGate>
    </NavigationContainer>
  );
}

export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
