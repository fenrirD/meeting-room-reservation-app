import React from "react";
import {ROOMS} from "../../constants";
import RoomName from "./RoomName";
import RoomRow from "./RoomRow/index";


const Room = () => {

  return (
    <>
      <RoomName/>
      <div>
        {ROOMS.map((room,idx)=><RoomRow roomName={room} key={`room_${room}_${idx}`}/>)}
      </div>
    </>
  )
}

export default Room