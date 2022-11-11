import {createSlice} from '@reduxjs/toolkit'
import type {AppThunk, RootState} from './store'
import {ReservationType, ReservationInfo} from "../types";
import Utils from "../utils";

const initialState = [] as ReservationType[];

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: initialState,
  reducers: {
    registerReservation: (state,action) => {
      state.push({...action.payload, id:(state.length||0)+1})
    },
    updateReservation: (state,action) => {
      const item = action.payload
      return state.map((v:ReservationType)=>v.id===item.id ? item : v)
    },
    deleteReservation: (state,action) => {
      return state.filter(({id})=>id!==action.payload)
    }
  },
})


export const { registerReservation,updateReservation, deleteReservation } = reservationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectReservation = (state: RootState) => state.reservation

export default reservationSlice.reducer

export const isOverlapReservation = (newReservation:ReservationInfo):AppThunk => (dispatch, getState) => {
  const {reservation} = getState();

  const findIndex = reservation.findIndex(({roomName, startTime, endTime,id})=>
    id !== newReservation.id &&(newReservation.roomName===roomName) &&Utils.isIncludesTime(newReservation.startTime, newReservation.endTime, startTime, endTime)
  )
  if(findIndex===-1) {
    dispatch(updateReservation(newReservation))
  }else {
    alert('중복 시간 x')
  }
  console.log(getState(), 'isOverlapReservation', findIndex, newReservation)
}

