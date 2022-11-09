import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {ResizeReservation} from "../type";


const initialState = {
  isResizeReservation: false,
  resizeTarget: null,
  resizeDirection: null,
} as ResizeReservation

const resizeReservationSlice = createSlice({
  name: 'resizeReservation',
  initialState,
  reducers: {
    setResizeReservation: (state, action) => {
      console.log('setResizeReservation', action.payload)
      return ({
        ...action.payload
      })
    },
    clearResizeReservation: (state) => ({
      isResizeReservation: false,
      resizeTarget: null,
      resizeDirection: null,
    })
  }
})


export const {setResizeReservation, clearResizeReservation} = resizeReservationSlice.actions

export const selectResizeReservation = (state: RootState) => state.resizeReservation;

export default resizeReservationSlice.reducer