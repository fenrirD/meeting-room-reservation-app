import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {SAMPLE_DATA} from "../utills/data/sampleData";
import {Reservation} from "../type";



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