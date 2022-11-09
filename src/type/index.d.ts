export interface Reservation {
  readonly id: number
  roomName: Room,
  name: string,
  purpose: string,
  startTime: string,
  endTime: string,
}

export interface ReservationInfo {
  id?: number,
  roomName: Room,
  name?: string,
  purpose?: string,
  startTime: string,
  endTime: string,
}

export interface MenuLayer {
  isOpen: boolean,
  reservationInfo: ReservationInfo
}

export type Time = 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17

export type Room = 'A'| 'B'| 'C'| 'D'| 'E'| 'F'| 'G'| 'H'| 'I'| 'J'| ''


export type RoomData = {
  firstMinutes?:number,
  secondMinutes?:number,
}

export interface DragReservation extends Reservation {
  count:number
  originPosition:number
  halfHourWidth:number
}

export interface ResizeReservation {
  isResizeReservation: boolean,
  resizeDirection: 'left' | 'right' | null,
  resizeTarget: Reservation | null
}