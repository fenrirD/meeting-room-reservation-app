import React, {useEffect, useRef, useState} from "react";
import {ROOMS, SAMPLE_DATA} from "../../utills/data/sampleData";
import MenuLayer from "../MenuLayer";
import RowName from "./RowName";
import Row from "./Row";

const Body = () => {
  const roomValEL = useRef<HTMLDivElement>(null);
  // const [events, setEvent] = useState<any>();

  const [eventList, setEventList] =React.useState<any>([]);


  const [open, setOpen] = React.useState(false);

  const [reservation, setReservation] = React.useState({});


  const handleClickEvent = (v:any) => {
    console.log('handleClickEvent!',v)
    setOpen(true);
    setReservation(v)
  }
  const handleClickOpen = (event:any) => {

    setOpen(true);
    const t = `${event.startHour}:${event.startMinute==1 ? '30' : '00'}~${  Number(event.endHour)+Number(event.endMinute)}:${event.endMinute==1? '00' : '30'}`
    console.log('handleClickOpen',event,'??????!', event.startMinute, t)
    setReservation({time:t, roomName: event.roomName})
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (v:any) => {
    // console.log('handle', eventList,v,)
    // const id = (eventList.length || 0)+1
    // setData([{]
    //   ...data, [v.roomName]: data[v.roomName] ? [...data[v.roomName],{...v,id}]: [{...v,id}]
    // })
    // setEventList([...eventList,{...v,id}])
    setOpen(false)
  }

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



  console.log('bodyRerender - create -',eventList)
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
          {ROOMS.map((room,idx)=><Row roomName={room} handleClickOpen={handleClickOpen}  handleClickEvent={handleClickEvent} dragUpdateData={dragUpdateData} key={`room_${room}_${idx}`}/>)}
        </div>
      </div>
      <MenuLayer open={open} handleClose={handleClose} handleConfirm={handleConfirm} reservation={reservation}/>
    </div>
  )
}

export default Body