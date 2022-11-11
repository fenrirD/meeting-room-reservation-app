import React from "react";
import {ROOMS} from "../../../constants";
import {RoomNameType} from "../../../types";
import styles from '../styles.module.css'

const RoomName = () => {

  return (
    <div className={styles.room_name}>
      {ROOMS.map((room:RoomNameType)=> <div key={`room_${room}`}>{room}</div>)}
    </div>
  )
}

export default RoomName