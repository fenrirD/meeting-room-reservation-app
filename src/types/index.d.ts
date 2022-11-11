import {ReactNode} from "react";

export interface ReservationType {
  readonly id: number
  roomName: RoomNameType,
  name: string,
  purpose: string,
  startTime: string,
  endTime: string,
}

export interface ReservationInfo {
  id?: number,
  roomName: RoomNameType,
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

export type RoomNameType = 'A'| 'B'| 'C'| 'D'| 'E'| 'F'| 'G'| 'H'| 'I'| 'J'| ''


export type RoomData = {
  firstMinutes?:number,
  secondMinutes?:number,
}

export interface DragReservation extends ReservationType {
  count:number
  originPosition:number
  halfHourWidth:number
}

export interface ResizeReservation extends ReservationType {
  resizeDirection?: 'left' | 'right' | null | undefined ,
}


declare module '../components/Reservation' {
  import type {ReactNode} from 'react';

  export interface Props {
    readonly children?: ReactNode;
    readonly reservation:ReservationType;
    readonly componentWidth:number;
    readonly color:string;
  }
  export default function Reservation(props: Props): JSX.Element;
}


export default interface ReservationProps {
  readonly children?: ReactNode;
  readonly reservation: ReservationType;
  readonly componentWidth: number;
  readonly color: string;
}
