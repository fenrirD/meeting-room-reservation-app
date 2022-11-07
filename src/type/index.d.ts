export interface Reservation {
  readonly id: number
  roomName: string,
  name:string,
  purpose: string,
  startTime: string,
  endTime: string,
  time: string,
}

export interface ReservationInfo {
  id?:number,
  roomName: string,
  name?:string,
  purpose?: string,
  startTime: string,
  endTime: string,
  time: string,
}

export interface MenuLayer {
  isOpen: boolean,
  reservationInfo: ReservationInfo
}

export type Time = number

export type Room = string