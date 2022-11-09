import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import reservationReducer from "./reservationSlice";
import menuLayerReducer from "./menuLayerSlice";
import resizeReservationReducer from "./resizeReservationSlice";
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux";
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'


// @ts-ignore
const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  // @ts-ignore
  console.groupEnd(action.type);
  return result;
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist:['menuLayer','resizeReservation']
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  reservation: reservationReducer,
  menuLayer: menuLayerReducer,
  resizeReservation: resizeReservationReducer
}))

export const store = configureStore({
  // reducer: {
  //   counter: counterReducer,
  //   reservation: reservationReducer,
  //   menuLayer: menuLayerReducer,
  //   resizeReservation: resizeReservationReducer
  // },
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger)
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;