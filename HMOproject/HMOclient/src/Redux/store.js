import { configureStore } from '@reduxjs/toolkit'
import memberReducer from '../Redux/memberSlice'
import personalReducer from '../Redux/personalDetailsSlice'
import currentMemberReducer from '../Redux/currentMemberSlice'
import covidReducer from '../Redux/covidSlice'
import { combineReducers } from 'redux';
import sessionStorage from "redux-persist/es/storage/session";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
const reducers = {
  members: memberReducer,
  personalDetails: personalReducer,
  currentMember: currentMemberReducer,
  covid: covidReducer
}
const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['currentMember'],

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
});

export const persistor = persistStore(store);