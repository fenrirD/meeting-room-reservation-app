import React from "react";
import CurrentTime from "../../CurrentTime";
import styles from '../styles.module.css';

const RoomBody = ({children}:any) => {
  return (
    <div className={styles.room_body}>
      <div className={styles.flex_none}></div>
      <CurrentTime/>
      {children}
    </div>
  )
}

export default RoomBody