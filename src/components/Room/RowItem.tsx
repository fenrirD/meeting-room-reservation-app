import React, {useRef} from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../utills/data/sampleData";
import {DragReservation} from "../../type";
import Utils from "../../utills";

const RowItem = ({roomName, index, hour, minutes}: any) => {

  const divEl = useRef<HTMLDivElement>(null);
  // console.log('RoomValue','rerneder?')
  const [{canDrop, isOver, handlerId}, drop] = useDrop(() => ({
    accept: ItemType.RESERVATION,
    // canDrop: () => false,
    drop: (item:DragReservation, monitor) => {

      // console.log('drag monitor -drop', item,monitor.getClientOffset(), monitor.getInitialClientOffset(), monitor.getInitialSourceClientOffset(), monitor.getDifferenceFromInitialOffset())
      // monitor.getInitialSourceClientOffset() 클릭한 지점의 중간으로감
      //getInitialClientOffset - 132 하면 클릭한 위치임 132는 마진 + 네임 위드값
      const selectX:number =  (monitor.getInitialClientOffset()?.x || 0)- 100 ;
      const originStartX = item.originPosition;
      const selectIndex = Math.floor(((selectX-originStartX) / item.halfHourWidth));

      const selectTime = (hour*60) + minutes;
      let stTime = selectTime;
      console.log('drag monitor - ','select Idx',selectIndex , selectX , originStartX, item.halfHourWidth );
      for (let i = 0; i < selectIndex; i++) {
        stTime-=30
        // console.log(`drag monitor - `, stTime)
      }
      let eTime = selectTime;
      for (let i = selectIndex; i < item.count; i++) {
        eTime+=30;
      }
      if(stTime/60 < 9) {
        stTime = 60*9;
      }
      console.log(`drag monitor ${Math.floor(stTime/60)}:${stTime%60? '30' : '00'} ~ ${Math.floor(eTime/60)}:${eTime%60? '30' : '00'}`, stTime)
      const newItem = {
        id: item.id,
        purpose: item.purpose,
        name: item.name,
        roomName: roomName,
        startTime: Utils.minutesToStringTime(stTime),
        endTime: Utils.minutesToStringTime(eTime),
      }
      return ({...newItem})
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  drop(divEl)
  return (
    <div ref={divEl} className='room_col_sub' data-id={handlerId} data-index={index} data-hour={hour} data-minutes={minutes}></div>
  )
}
export default RowItem