import React, {useRef} from "react";
import {ROOMS} from "../../utills/data/sampleData";
import RowName from "./RowName";
import Row from "./Row";

const Body = () => {

  return (
    <div className="body">
      <div className='flex_none'></div>
      <div className='real_time'>
        <div></div>
        <div className='time'>
          <div style={{height: '700px'}} className='time_son'></div>
          <div style={{left: "66%", position: 'absolute'}}>1</div>
        </div>
      </div>
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