import React, {useRef} from "react";
import {useDrop} from "react-dnd";

const RowItem = ({roomName, time, index}: any) => {

  const divEl = useRef<HTMLDivElement>(null);
  console.log('RoomValue','rerneder?')
  const [{canDrop, isOver, handlerId,coords}, drop] = useDrop(() => ({
    accept: 'box',
    // canDrop: () => false,
    drop: (item:any, monitor) => {
      // console.log('drag drop', item, monitor, monitor.getDropResult(), roomName, time ,index, monitor.getHandlerId())
      // const a = monitor.getDifferenceFromInitialOffset();
      // console.log('drag monitor -drop',monitor,'getInitialClientOffset:',monitor.getInitialClientOffset(),'getInitialSourceClientOffset:',monitor.getInitialSourceClientOffset(),',getClientOffset:',monitor.getClientOffset(), ', getSourceClientOffset:',monitor.getSourceClientOffset(), ',d:',monitor.getDifferenceFromInitialOffset())
      console.log('drag monitor -drop',monitor.getClientOffset(), monitor.getInitialClientOffset(), monitor.getInitialSourceClientOffset())

      const a = monitor.getClientOffset();
      const b = monitor.getSourceClientOffset();
      const [startTime, endTime] = item.time.split('~');
      const [startHour, startMinute] = startTime.split(":").map((v:any)=>Number(v));
      const [endHour, endMinute] = endTime.split(":").map((v:any)=>Number(v));
      const calcTime = (endHour*60+endMinute) - (startHour*60+startMinute)
      const newStartTime = [time, index ? 30 : 0];
      const newEndTime = (newStartTime[0]*60 + newStartTime[1]) + calcTime;
      const strTime = `${newStartTime[0]}:${index ? "30" : '00'}~${Math.floor(newEndTime/60)}:${newEndTime%60? '30' : '00'}`
      // console.log(roomName, item, monitor, a, b)
      console.log('end Time', newEndTime, calcTime)
      const newItem = {
        ...item,
        roomName: roomName,
        time: strTime
      }
      return ({name: roomName, left: b?.x, newItem})
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId:monitor.getHandlerId(),
      coords:monitor.getSourceClientOffset(),
    }),
  }))
  drop(divEl)
  // console.log('drag monitor drop',coords)
  return (
    <div ref={divEl} className='room_col_sub' data-index={index} data-time={time} data-id={handlerId} ></div>

  )
}
export default RowItem