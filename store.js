import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import user from './reducers/user';
import theme from './reducers/theme';
import IPAdress from './reducers/IPAddress';

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistorConfig = {
  key: 'ez-trip',
  storage: AsyncStorage,
};

const reducers = {
  user,
  theme,
  IPAdress,
};

export const store = configureStore({
  reducer: persistReducer(persistorConfig, combineReducers(reducers)),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
