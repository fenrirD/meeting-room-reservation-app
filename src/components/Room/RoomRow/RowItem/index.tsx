import React, {useRef} from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../../../constants";
import {DragReservation} from "../../../../types";
import Utils from "../../../../utils";
import styles from '../../styles.module.css';
const RowItem = ({roomName, index, hour, minutes}: any) => {

  const divEl = useRef<HTMLDivElement>(null);
  const [{handlerId}, drop] = useDrop(() => ({
    accept: ItemType.RESERVATION,
    drop: (item:DragReservation, monitor) => {

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

      if(eTime /60 > 18) {
        eTime = 60* 18
      }

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
    <div ref={divEl} className={styles.room_col_sub} data-id={handlerId} data-index={index} data-hour={hour} data-minutes={minutes}></div>
  )
}
export default RowItem