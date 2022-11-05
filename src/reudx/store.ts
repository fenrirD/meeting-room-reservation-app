import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import reservationReducer from "./reservationSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    reservation: reservationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
