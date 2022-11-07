import {Reservation, Room, Time} from "../../type";


export const SAMPLE_DATA:Reservation[] = [
  {
    id:1,
    roomName: 'A',
    name: "이시용",
    purpose: "그냥",
    startTime:'9:30',
    endTime:'10:30',
    time: "9:30~10:30"
  },
  {
    id:2,
    roomName:'B',
    name:"윤지영",
    purpose: "저냥",
    startTime:'12:30',
    endTime:'14:30',
    time:"12:30~14:30"
  }
]

export const TIMES:Time[] = [9, 10, 11, 12, 13, 14, 15, 16, 17]

export const ROOMS:Room[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',]