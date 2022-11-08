import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {AppThunk, RootState} from './store'
import {SAMPLE_DATA} from "../utills/data/sampleData";
import {Reservation, ReservationInfo} from "../type";
import {AppBarTypeMap} from "@mui/material";
import Utils from "../utills";



// Define the initial state using that type
const initialState = SAMPLE_DATA as Reservation[]


export const reservationSlice = createSlice({
  name: 'reservation',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    registerReservation: (state,action) => {
      state.push({...action.payload, id:(state.length||0)+1})
    },
    updateReservation: (state,action) => {
      const item = action.payload
      return state.map((v:any)=>v.id===item.id ? item : v)
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})


export const { registerReservation,updateReservation } = reservationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectReservation = (state: RootState) => state.reservation

export default reservationSlice.reducer

export const isOverlapReservation = (newReservation:ReservationInfo):AppThunk => (dispatch, getState) => {
  const {reservation} = getState();

  const findIndex = reservation.findIndex(({roomName, startTime, endTime})=>
    (newReservation.roomName===roomName) &&Utils.isIncludesTime(newReservation.startTime, newReservation.endTime, startTime, endTime)
  )
  if(findIndex===-1) {
    dispatch(updateReservation(newReservation))
  }else {
    alert('중복 시간 x')
  }
  console.log(getState(), 'isOverlapReservation', findIndex, newReservation)
}

export const incrementIfOdd =
  (amount: number): AppThunk =>
    (dispatch, getState) => {
      // const currentValue = selectCount(getState());
      // if (currentValue % 2 === 1) {
      //   dispatch(incrementByAmount(amount));
      // }
    };
