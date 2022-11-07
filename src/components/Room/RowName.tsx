import React from "react";
import {ROOMS} from "../../utills/data/sampleData";
import {Room} from "../../type";

const RoomName = () => {

  return (
    <div className="room_name">
      {ROOMS.map((room:Room)=> <div key={`room_${room}`}>{room}</div>)}
    </div>
  )
}

export default RoomName