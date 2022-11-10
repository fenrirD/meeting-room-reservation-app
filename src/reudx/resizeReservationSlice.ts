import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";


const initialState = {
  isResizeReservation: false,
} as {
  isResizeReservation:boolean
}

const resizeReservationSlice = createSlice({
  name: 'resizeReservation',
  initialState,
  reducers: {
    clearResizeReservation: (state) => ({
      isResizeReservation: false,
    }),
    startResizeReservation: (state)=> ({
      isResizeReservation:true
    })
  }
})


export const {startResizeReservation, clearResizeReservation} = resizeReservationSlice.actions

export const selectResizeReservation = (state: RootState) => state.resizeReservation;

export default resizeReservationSlice.reducer