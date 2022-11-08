export interface Reservation {
  readonly id: number
  roomName: Room,
  name: string,
  purpose: string,
  startTime: string,
  endTime: string,
  time: string,
}

export interface ReservationInfo {
  id?: number,
  roomName: Room,
  name?: string,
  purpose?: string,
  startTime: string,
  endTime: string,
  time: string,
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
