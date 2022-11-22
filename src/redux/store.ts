import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {driversReducer} from './reducers/driversReducer';
import {persistStore, persistReducer} from 'redux-persist';

const reducers = combineReducers({
  drivers: driversReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['drivers'],
};

const rootReducer = persistReducer(persistConfig, reducers);

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const rootStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
