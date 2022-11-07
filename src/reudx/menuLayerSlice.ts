import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {MenuLayer, ReservationInfo} from "../type";


const initialState = {
  isOpen: false,
  reservationInfo: {

  }
} as MenuLayer

export const menuLayerSlice = createSlice({
  name: 'menuLayer',
  initialState,
  reducers: {
    openMenuLayer: (state, {payload, type}:PayloadAction<ReservationInfo, string>) => {
      return {
        isOpen: true,
        reservationInfo: payload
      }
    },
    closeMenuLayer: (state) => {
      return {
        isOpen: false,
        reservationInfo: {
          roomName: '',
          startTime:'',
          endTime:'',
          time: ""
        }
      }
    }
  }
})


export const selectMenuLayer = (state: RootState) => state.menuLayer

export const { openMenuLayer, closeMenuLayer } = menuLayerSlice.actions

export default menuLayerSlice.reducer