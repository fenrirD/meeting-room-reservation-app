import React from "react";
import {Time} from "../../../types";
import styles from '../styles.module.css';


const RoomHeader = ({names}: { names: Time[] }) => {
  return (
    <div className={styles.room_header}>
      <div>
        <div></div>
      </div>
      {
        names.map((name: Time) => (<div className={styles.room_header_label} key={`header_${name}`}>{name}</div>))
      }
    </div>
  )
}
export default RoomHeader