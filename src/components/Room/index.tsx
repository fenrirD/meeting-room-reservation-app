import React, {useEffect, useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import './index.css'
import {doesNotReject} from "assert";
import useResize from "../../hook/useResize";
import MenuLayer from "../MenuLayer";
import {SAMPLE_DATA} from "../../utills/data/sampleData";

const RoomHeader = () => {
  return (
    <div className="header">
      <div>
        <div></div>
      </div>
      <div className="header_label">9</div>
      <div className="header_label">10</div>
      <div className="header_label">11</div>
      <div className="header_label">12</div>
      <div className="header_label">13</div>
      <div className="header_label">14</div>
      <div className="header_label">15</div>
      <div className="header_label">16</div>
      <div className="header_label">17</div>
    </div>
  )
}
const RoomNameDiv = () => <div>A</div>
const RoomName = () => {
  return (
    <div className="room_name">
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
      <RoomNameDiv/>
    </div>
  )
}

export interface BoxProps {
  name: string
}

interface DropResult {
  name: string
}

const EventZone = ({roomName, events}: any) => {
  console.log('rerender Event Zone', events)
  const eventDiv = useRef<HTMLDivElement>(null);
  const {width, height} = useResize(eventDiv);
  // console.log(width, height)
  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item, monitor) => {
      // const a = monitor.getDifferenceFromInitialOffset();
      const a = monitor.getClientOffset();
      const b = monitor.getSourceClientOffset();
      console.log(roomName, item, monitor, a, b)
      return ({name: roomName, left: b?.x})
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  drop(eventDiv);


  // console.log("events!",events, eventDiv?.current?.offsetWidth)
  return (
    <div className='event_zone' ref={eventDiv} data-testid="dustbin">
      {events && events.map((data:any)=>{
        return <EventComponent data={data} width={width}/>
      })}

    </div>
  )
}
const EventComponent = ({data, width}:any) => {

  //1. 일단은 시작지점을 구한다
  console.log(data,"???")
  const [startTime, endTime] = data?.time.split('~');
  const [startHour, startMinute] = startTime.split(':');
  const [endHour, endMinute] = endTime.split(':');
  const colWidth = width/9
  const startLeft = Number(startHour) % 9 + (startMinute==='30'? 0.5 : 0)
  const calc = (Number(endHour) - Number(startHour)) + ((Number(endMinute) - Number(startMinute))? 0.5 : 0)

  const [{isDragging}, drag] = useDrag(() => ({
    type: 'box',
    item: {name: 'lee'},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      console.log(item, dropResult)
      if (item && dropResult) {
        console.log(item)
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  console.log('calc',(startLeft/width)*100, startLeft, data, startMinute, startMinute==='30'? 0.5 : 0,startLeft, calc, ((Number(endMinute) - Number(startMinute))? 0.5 : 0))
  return (
    <div style={{
      width: `${colWidth*calc}px`,
      height: '50px',
      backgroundColor: 'red',
      top: '0px',
      position: 'absolute',
      left: `${((colWidth)*startLeft/width)*100}%`
    }} ref={drag}>
      {data.name}<br/>
      {data.time}
    </div>
  )
}

const RoomCol = ({roomName, time}: any) => {

  const divEl = useRef<HTMLDivElement>(null);

  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item, monitor) => {
      // const a = monitor.getDifferenceFromInitialOffset();
      const a = monitor.getClientOffset();
      const b = monitor.getSourceClientOffset();
      console.log(roomName, item, monitor, a, b)
      return ({name: roomName, left: b?.x})
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  return (
    <>
      <div className='room_col_sub' ref={drop} data-index={0} data-time={time}></div>
      <div className='room_col_sub' ref={drop} data-index={1} data-time={time}></div>
    </>
  )
}

const RoomValue = ({roomName, events, handleClickOpen}: any) => {
  const roomValEL = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<Boolean>(false);
  const [event , setEvent] = useState<any>(null);
  const mouseMove = (e: any) => {
    if (isDrag) {
      // console.log('mouse move!', e.target)
      e.target.style.backgroundColor = 'red'
    }
  }

  const mouseUp = (e: any) => {
    e.preventDefault()
    if (roomValEL?.current) {
      console.log('mouseup!',e, e.target, event)
      const newE = {
        endHour: e.target.dataset.time,
        endMinute: e.target.dataset.index
      }
      setIsDrag(false)
      setEvent({...event,...newE})
      handleClickOpen({...event,...newE, roomName:roomName})
      // roomValEL.current.removeEventListener("mousemove", mouseMove)
      // roomValEL.current.removeEventListener("mouseup", mouseUp)
    }
  }
  const handleMouseDown = (e: any) => {
    console.log('click mouse!')
    if (roomValEL?.current) {
      console.log('mouse down',roomValEL, e.target, e.target.dataset.index)
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

  console.log('RoomValue:',event)

  return (
    <div className='room_value'>
      <EventZone roomName={roomName} events={events}/>
      <div></div>
      <div className='room_col' ref={roomValEL} onMouseDown={handleMouseDown} onMouseMove={mouseMove}
           onMouseUp={mouseUp}>
        <RoomCol roomName={roomName} time={9}/>
        <RoomCol roomName={roomName} time={10}/>
        <RoomCol roomName={roomName} time={11}/>
        <RoomCol roomName={roomName} time={12}/>
        <RoomCol roomName={roomName} time={13}/>
        <RoomCol roomName={roomName} time={14}/>
        <RoomCol roomName={roomName} time={15}/>
        <RoomCol roomName={roomName} time={16}/>
        <RoomCol roomName={roomName} time={17}/>
      </div>
    </div>
  )
}

const RoomBody = () => {
  const roomValEL = useRef<HTMLDivElement>(null);
  // const [events, setEvent] = useState<any>();

  const [data, setData] = useState<any>(null);

  const events = {
    A:[{
      name:"lee",
      time:'9:30~11:00'
    }]
  }

  const [open, setOpen] = React.useState(false);

  const [reservation, setReservation] = React.useState({});
  useEffect(()=>{
    console.log('use Effect Room Body')
    const data = SAMPLE_DATA.reduce((acc,cur)=>{
      return ({
        ...acc,
        [cur.roomName]: cur[cur.roomName] ? cur[cur.roomName].push(cur) : [cur]
      })
    },{})
    setData(data)
  },[])

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
    console.log('handle', data,v)
    setData({
      ...data, [v.roomName]: data[v.roomName] ? [...data[v.roomName],v]: [v]
    })
    setOpen(false)
  }
  console.log(data,"생성")
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
        <RoomName/>
        {/*<div className="room_val" ref={roomValEL} onMouseDown={handleMouseDown}>*/}
        <div className="room_val" ref={roomValEL}>

          <RoomValue roomName='A' events={data? data['A'] : []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='B' events={data? data['B'] : []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='C' events={data? data['C']: []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='D' events={data? data['D']: []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='E' events={data? data['E']: []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='F' events={data? data['F']: []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='G' events={data? data['G']: []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='H' events={data? data['H']: []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='I' events={data? data['I']: []} handleClickOpen={handleClickOpen}/>
          <RoomValue roomName='J' events={data? data['J']: []} handleClickOpen={handleClickOpen}/>
        </div>
      </div>
      <MenuLayer open={open} handleClose={handleClose} handleConfirm={handleConfirm} reservation={reservation}/>
    </div>
  )
}


const Room = () => {
  return (
    <>
      <RoomHeader/>
      <RoomBody/>
    </>
  )
}

export default Room