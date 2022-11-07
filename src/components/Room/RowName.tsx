import React from "react";
import {ROOMS} from "../../utills/data/sampleData";

const RoomName = () => {

  return (
    <div className="room_name">
      {ROOMS.map((room)=> <div key={`room_${room}`}>{room}</div>)}
    </div>
  )
}

export default RoomName