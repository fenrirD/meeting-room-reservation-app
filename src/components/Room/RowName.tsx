import React from "react";
import {ROOMS} from "../../constants";
import {RoomNameType} from "../../types";

const RoomName = () => {

  return (
    <div className="room_name">
      {ROOMS.map((room:RoomNameType)=> <div key={`room_${room}`}>{room}</div>)}
    </div>
  )
}

export default RoomName