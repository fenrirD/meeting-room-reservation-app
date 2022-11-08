import React, {useRef} from "react";
import {ROOMS} from "../../utills/data/sampleData";
import RowName from "./RowName";
import Row from "./Row";
import CurrentTime from "../CurrentTime";

const Body = () => {

  return (
    <div className="body">
      <div className='flex_none'></div>
      <CurrentTime/>
      <div className="room">
        <div></div>
        <RowName/>
        <div className="room_val">
          {ROOMS.map((room,idx)=><Row roomName={room} key={`room_${room}_${idx}`}/>)}
        </div>
      </div>
    </div>
  )
}

export default Body