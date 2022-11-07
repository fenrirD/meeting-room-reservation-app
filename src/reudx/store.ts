import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import reservationReducer from "./reservationSlice";
import menuLayerReducer from "./menuLayerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    reservation: reservationReducer,
    menuLayer: menuLayerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
