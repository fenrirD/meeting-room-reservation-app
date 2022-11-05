import React, {useRef} from "react";
import {useDrop} from "react-dnd";

const RowItem = ({roomName, time, index}: any) => {

  const divEl = useRef<HTMLDivElement>(null);

  const [{canDrop, isOver, handlerId}, drop] = useDrop(() => ({
    accept: 'box',
    // canDrop: () => false,
    drop: (item:any, monitor) => {
      console.log('drag drop', item, monitor, monitor.getDropResult(), roomName, time ,index, monitor.getHandlerId())
      // const a = monitor.getDifferenceFromInitialOffset();
      const a = monitor.getClientOffset();
      const b = monitor.getSourceClientOffset();
      const [startTime, endTime] = item.time.split('~');
      const [startHour, startMinute] = startTime.split(":").map((v:any)=>Number(v));
      const [endHour, endMinute] = endTime.split(":").map((v:any)=>Number(v));
      const calcTime = (endHour*60+endMinute) - (startHour*60+startMinute)
      const newEndTime = `${time}:${index ? "30" : '00'}~${Math.floor(calcTime/60) + time}:${index ? '30' : '00'}`
      // console.log(roomName, item, monitor, a, b)
      console.log('end Time', newEndTime, calcTime)
      const newItem = {
        ...item,
        roomName: roomName,
        time: newEndTime
      }
      return ({name: roomName, left: b?.x, newItem})
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId:monitor.getHandlerId(),
    }),
  }))
  drop(divEl)
  return (
    <div ref={divEl} className='room_col_sub' data-index={index} data-time={time} data-id={handlerId}></div>

  )
}
export default RowItem