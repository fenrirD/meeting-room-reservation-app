import React, {useEffect, useRef, useState} from "react";
import {ROOMS, SAMPLE_DATA} from "../../utills/data/sampleData";
import MenuLayer from "../MenuLayer";
import RowName from "./RowName";
import Row from "./Row";

const Body = () => {
  const roomValEL = useRef<HTMLDivElement>(null);
  // const [events, setEvent] = useState<any>();

  const [eventList, setEventList] =React.useState<any>([]);


  const dragUpdateData = (item:any) => {

    const newData = eventList.map((v:any)=>v.id===item.id ? item : v)
    console.log('dragUpdateData - DATA',item, eventList)
    console.log('dragUpdateData = new data', newData)
    setEventList((old:any)=>{
      console.log('setData',old,)
      return old.map((v:any)=>v.id===item.id ? item : v)
    })
    // setEventList(newData)
  }

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
        <div className="room_val" ref={roomValEL}>
          {ROOMS.map((room,idx)=><Row roomName={room} dragUpdateData={dragUpdateData} key={`room_${room}_${idx}`}/>)}
        </div>
      </div>
    </div>
  )
}

export default Body