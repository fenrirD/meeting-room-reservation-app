import React, {useCallback, useEffect, useRef, useState} from "react";
import EventZone from "./EventZone";
import RowItem from "./RowItem";
import {TIMES} from "../../utills/data/sampleData";
import {useAppSelector} from "../../reudx/hooks";
import _ from "lodash";
import {useDispatch} from "react-redux";
import {updateReservation} from "../../reudx/reservationSlice";
import {openMenuLayer} from "../../reudx/menuLayerSlice";
import {ReservationInfo} from "../../type";

const Row = ({roomName, data, dragUpdateData}: any) => {
  const roomValEL = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<Boolean>(false);
  const [event, setEvent] = useState<any>(null);
  const [target, setTarget] = useState<any>([]);
  // 리사이즈용
  const [isResizeDrag, setIsResizeDrag] = useState<Boolean>(false);
  const [resizeTarget, setResizeTarget] = useState<any>(null)

  const dispatch = useDispatch()

  const a = useCallback(_.throttle((e: any) => {
    const n = target.filter((div: HTMLDivElement) => div.dataset.id !== e.dataset.id)
    console.log('mouseup', n, e.dataset.id)
    setTarget([...n, e])
  }, 500), [target])


  const mouseMove = (e: any) => {
    console.log('move!',isDrag)
    if (isDrag && e.target.dataset.id) {
      console.log('mouse move!', e.target)
      // e.target.style.backgroundColor = 'red'
      e.target.classList.add('test_css')
      a(e.target)
    }
  }
  const reservation = useAppSelector((state) => {
    console.log(state, "count")
    return state.reservation
  })

  // const events = data ? data.reduce((acc:any,cur:any)=>{
  //   console.log(acc,'acc', acc[cur.roomName])
  //   return ({
  //     ...acc,
  //     [cur.roomName]: acc[cur.roomName] ? [...acc[cur.roomName],cur] : [cur]
  //   })
  // },{}) : []
  const events = reservation.reduce((acc: any, cur: any) => {
    console.log(acc, 'acc', acc[cur.roomName])
    return ({
      ...acc,
      [cur.roomName]: acc[cur.roomName] ? [...acc[cur.roomName], cur] : [cur]
    })
  }, {})

  console.log('소름', data, events)
  const registerReservation = (param:ReservationInfo) => dispatch(openMenuLayer(param))

  const mouseUp = (e: any) => {
    e.preventDefault()
    if (roomValEL?.current && isDrag) {
      console.log('mouseup!', e, e.target, event, target)
      const newE = {
        endHour: e.target.dataset.time,
        endMinute: e.target.dataset.index
      }
      setIsDrag(false)
      setEvent({...event, ...newE})
      const param:ReservationInfo = {
        roomName,
        time:`${event.startHour}:${event.startMinute==1 ? '30' : '00'}~${  Number(newE.endHour)+Number(newE.endMinute)}:${newE.endMinute==1? '00' : '30'}`,
        startTime:`${event.startHour}:${event.startMinute==1 ? '30' : '00'}`,
        endTime: `${Number(newE.endHour)+Number(newE.endMinute)}:${newE.endMinute==1? '00' : '30'}`
      }
      // modal Open
      registerReservation(param);
      // handleClickOpen({...event, ...newE, roomName: roomName})
      target.forEach((d: HTMLDivElement) => d.classList.remove('test_css'))
      e.target.classList.remove('test_css')
    }else if(isResizeDrag){
      alert('resize!')
      setIsResizeDrag(false)
    }
  }
  const handleMouseDown = (e: any) => {
    console.log('click mouse!')
    e.preventDefault()
    if (roomValEL?.current) {
      const newE = {
        startHour: e.target.dataset.time,
        startMinute: e.target.dataset.index
      }
      console.log('mouse down', roomValEL, e.target, e.target.dataset.index, newE)
      // roomValEL.current.addEventListener("mouseup", mouseUp)
      // roomValEL.current.addEventListener("mousemove", mouseMove)
      setEvent({...event, ...newE})
      setIsDrag(true);
    }
    // console.log(e,'move')
    console.log(roomValEL)
  }

  const resizeMouseMove = (e:any) => {
    console.log('!!!')
    if(isResizeDrag){
      // const [time,index] = e.target.dataset

      const [startTime, endTime] = resizeTarget.time.split('~');
      const newTime = `${e.target.dataset.time}:${e.target.dataset.index == 1?'30':'00'}~${endTime}`
      console.log('resize move =>',e, resizeTarget, e.target.dataset.time,e.target.dataset.index, newTime)
      const newData = {
        ...resizeTarget,
        time:newTime
      }
      dispatch(updateReservation(newData))
    }
  }

  console.log('RoomValue:', events, events[roomName], roomName, isDrag)
  useEffect(()=>{
    if(roomValEL.current && isDrag){
      console.log('mouseup call befor',target)
      // roomValEL.current.addEventListener("mouseup", mouseUp)
      roomValEL.current.addEventListener("mousemove", mouseMove)
    }

    return () => {
      if(roomValEL.current){
        console.log('제거!')
        // roomValEL.current.removeEventListener("mouseup", mouseUp)
        roomValEL.current.removeEventListener("mousemove", mouseMove)
      }
    }
  },[isDrag, target])

  useEffect(()=>{
    if(roomValEL.current && isResizeDrag){
      console.log('mouseup call befor',target)
      // roomValEL.current.addEventListener("mouseup", mouseUp)
      roomValEL.current.addEventListener("mousemove", resizeMouseMove)
    }

    return () => {
      if(roomValEL.current){
        console.log('제거!')
        // roomValEL.current.removeEventListener("mouseup", mouseUp)
        roomValEL.current.removeEventListener("mousemove", resizeMouseMove)
      }
    }
  },[isResizeDrag, resizeTarget])
  const handleLeftResizeClick = (data:any) => {
    setIsResizeDrag(true)
    setResizeTarget(data)
  }
  const handleLeftResizeClearClick = () => {
    setIsResizeDrag(false)
    setResizeTarget(null)
    alert(1)
  }

  return (
    <div className='room_value'>
      <EventZone roomName={roomName} events={events[roomName]}
                 dragUpdateData={dragUpdateData} isResizeDrag={isResizeDrag} handleLeftResizeClick={handleLeftResizeClick} handleLeftResizeClearClick={handleLeftResizeClearClick}/>
      <div key={`free_${roomName}`}></div>
      <div className='room_col' ref={roomValEL} onMouseDown={handleMouseDown} onMouseUp={mouseUp}>
        {TIMES.map((time, idx) =>
          <div key={`${roomName}_time_${idx}`}>
            <RowItem roomName={roomName} time={time} key={`time_${roomName}_0_${time}`} index={0}/>
            <RowItem roomName={roomName} time={time} key={`time_${roomName}_1_${time}`} index={1}/>
          </div>
        )}

      </div>
    </div>
  )
}
export default Row