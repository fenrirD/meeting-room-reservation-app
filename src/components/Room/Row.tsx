import React, {useCallback, useRef, useState} from "react";
import EventZone from "./EventZone";
import RowItem from "./RowItem";
import {TIMES} from "../../utills/data/sampleData";
import {useAppSelector} from "../../reudx/hooks";
import _ from "lodash";

const Row = ({roomName, data, handleClickOpen, handleClickEvent, dragUpdateData}: any) => {
  const roomValEL = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<Boolean>(false);
  const [event, setEvent] = useState<any>(null);
  const [target,setTarget] =useState<any>([]);
  const a = useCallback( _.throttle((e:any)=>{
    const n = target.filter((div:HTMLDivElement)=>div.dataset.id !==e.dataset.id)
    console.log('mouseup',n, e.dataset.id)
    setTarget([ ...n, e])
  },500),[target])
  const mouseMove = (e: any) => {
    if (isDrag && e.target.dataset.id) {
      console.log('mouse move!', e.target)
      // e.target.style.backgroundColor = 'red'
      e.target.classList.add('test_css')
      a(e.target)
    }
  }
  const reservation = useAppSelector((state) => {
    console.log(state,"count")
    return state.reservation
  })

  // const events = data ? data.reduce((acc:any,cur:any)=>{
  //   console.log(acc,'acc', acc[cur.roomName])
  //   return ({
  //     ...acc,
  //     [cur.roomName]: acc[cur.roomName] ? [...acc[cur.roomName],cur] : [cur]
  //   })
  // },{}) : []
  const events = reservation.reduce((acc:any,cur:any)=>{
    console.log(acc,'acc', acc[cur.roomName])
    return ({
      ...acc,
      [cur.roomName]: acc[cur.roomName] ? [...acc[cur.roomName],cur] : [cur]
    })
  },{})

  console.log('소름',data, events)
  const mouseUp = (e: any) => {
    e.preventDefault()
    if (roomValEL?.current) {
      console.log('mouseup!', e, e.target, event, target)
      const newE = {
        endHour: e.target.dataset.time,
        endMinute: e.target.dataset.index
      }
      setIsDrag(false)
      setEvent({...event, ...newE})
      handleClickOpen({...event, ...newE, roomName: roomName})
      target.forEach((d:HTMLDivElement)=>d.classList.remove('test_css'))
      e.target.classList.remove('test_css')
      // roomValEL.current.removeEventListener("mousemove", mouseMove)
      // roomValEL.current.removeEventListener("mouseup", mouseUp)
    }
  }
  const handleMouseDown = (e: any) => {
    console.log('click mouse!')
    if (roomValEL?.current) {
      console.log('mouse down', roomValEL, e.target, e.target.dataset.index)
      setIsDrag(true);
      const newE = {
        startHour: e.target.dataset.time,
        startMinute: e.target.dataset.index
      }
      setEvent({...event, ...newE})
      // roomValEL.current.addEventListener("mouseup", mouseUp)
      // roomValEL.current.addEventListener("mousemove", mouseMove)
    }
    // console.log(e,'move')
    console.log(roomValEL)
  }

  console.log('RoomValue:', events, events[roomName], roomName, isDrag)

  return (
    <div className='room_value'>
      <EventZone roomName={roomName} testData={events} events={events[roomName]} handleClickEvent={handleClickEvent} dragUpdateData={dragUpdateData}/>
      <div key={`free_${roomName}`}></div>
      <div className='room_col' ref={roomValEL} onMouseDown={handleMouseDown} onMouseMove={mouseMove}
           onMouseUp={mouseUp} >
        {TIMES.map((time, idx) =>
          <div key={`${roomName}_time_${idx}`}>
            <RowItem roomName={roomName} time={time} key={`time_${roomName}_0_${time}`} index={0} />
            <RowItem roomName={roomName} time={time} key={`time_${roomName}_1_${time}`} index={1} />
          </div>
        )}

      </div>
    </div>
  )
}
export default Row