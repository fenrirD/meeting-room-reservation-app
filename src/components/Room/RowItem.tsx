import React, {useRef} from "react";
import {useDrop} from "react-dnd";
import {it} from "node:test";

const RowItem = ({roomName, time, index}: any) => {

  const divEl = useRef<HTMLDivElement>(null);
  // console.log('RoomValue','rerneder?')
  const [{canDrop, isOver, handlerId,coords}, drop] = useDrop(() => ({
    accept: 'box',
    // canDrop: () => false,
    drop: (item:any, monitor) => {
      // console.log('drag drop', item, monitor, monitor.getDropResult(), roomName, time ,index, monitor.getHandlerId())
      // const a = monitor.getDifferenceFromInitialOffset();
      // console.log('drag monitor -drop',monitor,'getInitialClientOffset:',monitor.getInitialClientOffset(),'getInitialSourceClientOffset:',monitor.getInitialSourceClientOffset(),',getClientOffset:',monitor.getClientOffset(), ', getSourceClientOffset:',monitor.getSourceClientOffset(), ',d:',monitor.getDifferenceFromInitialOffset())
      console.log('drag monitor -drop', item,monitor.getClientOffset(), monitor.getInitialClientOffset(), monitor.getInitialSourceClientOffset(), monitor.getDifferenceFromInitialOffset())
      // monitor.getInitialSourceClientOffset() 클릭한 지점의 중간으로감
      //getInitialClientOffset - 132 하면 클릭한 위치임 132는 마진 + 네임 위드값
      const selectX:number =  (monitor.getInitialClientOffset()?.x || 0)- 132
      const originStartX = item.originPosition;
      const selectIndex = Math.floor(((selectX-originStartX) / item.colMWidth))
      //const beforeIndex =
      const selectTime = (time*60) + (index ? 30 : 0)
      let stTime = selectTime
      console.log('drag monitor - ','select Idx',selectIndex , selectX , originStartX, item.colMWidth )
      for (let i = 0; i < selectIndex; i++) {
        stTime-=30
        console.log(`drag monitor - `, stTime)
      }
      let eTime = selectTime
      for (let i = selectIndex; i < item.calc; i++) {
        eTime+=30
      }
      if(stTime/60 < 9) {
        stTime = 60*9
      }
      console.log(`drag monitor ${Math.floor(stTime/60)}:${stTime%60? '30' : '00'} ~ ${Math.floor(eTime/60)}:${eTime%60? '30' : '00'}`, stTime)
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
        // time: strTime,
        time: `${Math.floor(stTime/60)}:${stTime%60? '30' : '00'}~${Math.floor(eTime/60)}:${eTime%60? '30' : '00'}`
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