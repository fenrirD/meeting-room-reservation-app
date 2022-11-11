import {RoomNameType, Time} from "../types";


export const TIMES:Time[] = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export const ROOMS:RoomNameType[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',];

export const HOUR_MINUTES = 60;
export const HALF_HOUR = 30;

export const MIN_TIME = TIMES[0] - 1;
export const MAX_TIME = TIMES[TIMES.length-1] + 1;

export const MINUTES_COUNT = TIMES.length * 2;
export const HOUR_COUNT = TIMES.length;

export const ItemType = {
  RESERVATION: 'reservation'
}

export const COLORS:string[] = ['rgba(239,89,89, 0.5)', 'rgba(73, 129, 214,0.5)', 'rgba(29, 171, 47, 0.5)', 'rgba(52, 200, 224, 0.5)', 'rgba(214, 209, 69, 0.5)',]

