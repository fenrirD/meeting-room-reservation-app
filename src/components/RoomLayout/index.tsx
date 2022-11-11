import React from "react";
import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";
import {ROOMS, TIMES} from "../../constants";
import RoomName from "../Room/RoomName";
import Index from "../Room/RoomRow";
import styles from './styles.module.css';

const RoomLayout = () => {

  return (
    <>
      <RoomHeader names={TIMES}/>
      <RoomBody>
        <div className={styles.room_row}>
          <div></div>
          <>
          <RoomName/>
          <div>
            {ROOMS.map((room,idx)=><Index roomName={room} key={`room_${room}_${idx}`}/>)}
          </div>
          </>
        </div>
      </RoomBody>
    </>
  )
}

export default RoomLayout