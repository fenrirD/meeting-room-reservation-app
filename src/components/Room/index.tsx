import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import './index.css'
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

const EventZone = ({roomName}:any) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item,monitor) =>{
      // const a = monitor.getDifferenceFromInitialOffset();
      const a = monitor.getClientOffset();
      const b = monitor.getSourceClientOffset();
      console.log(roomName,item, monitor,a,b)
      return ({ name: roomName,left:b?.x })
    } ,
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
  return (
    <div className='event_zone' ref={drop}  data-testid="dustbin">
      <EventComponent/>
    </div>
  )
}
const EventComponent = () => {
  const [{isDragging},drag] = useDrag(() => ({
    type: 'box',
    item: { name:'lee' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      console.log(item,dropResult)
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
  return (
    <div style={{
      width: '50px',
      height: '50px',
      backgroundColor: 'blue',
      top: '0px',
      position: 'absolute'
    }} ref={drag}></div>
  )
}

const RoomCol = ({roomName}:any) => {
  const divEl = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item,monitor) =>{
      // const a = monitor.getDifferenceFromInitialOffset();
      const a = monitor.getClientOffset();
      const b = monitor.getSourceClientOffset();
      console.log(roomName,item, monitor,a,b)
      return ({ name: roomName,left:b?.x })
    } ,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const [{isDragging},drag] = useDrag(() => ({
    type: 'box',
    item: { name:roomName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      console.log('roomCol',item,dropResult)
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
  drag(drop(divEl));
  return (
    <div className='room_col_sub' ref={divEl}></div>
  )
}

const RoomValue = ({roomName}:any) => {

  return (
    <div className='room_value'>
      <EventZone roomName={roomName}/>
      <div></div>
      <div className='room_col'>
        <RoomCol></RoomCol>
        <RoomCol/>
        <RoomCol/>
        <RoomCol/>
        <RoomCol/>
        <RoomCol/>
        <RoomCol/>
        <RoomCol/>
        <RoomCol/>
      </div>
    </div>
  )
}

const RoomBody = () => {
  const roomValEL = useRef<HTMLDivElement>(null);

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
          <RoomValue roomName='A'/>
          <RoomValue roomName='B'/>
          <RoomValue roomName='C'/>
          <RoomValue roomName='D'/>
          <RoomValue roomName='E'/>
          <RoomValue roomName='F'/>
          <RoomValue roomName='G'/>
          <RoomValue roomName='H'/>
          <RoomValue roomName='I'/>
          <RoomValue roomName='J'/>
        </div>
      </div>
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