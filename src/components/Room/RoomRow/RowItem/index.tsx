import React, {useRef} from "react";
import {useDrop} from "react-dnd";
import {HALF_HOUR, HOUR_MINUTES, ItemType, TIMES} from "../../../../constants";
import {DragReservation} from "../../../../types";
import Utils from "../../../../utils";
import styles from '../../styles.module.css';

const RowItem = ({roomName, index, hour, minutes}: any) => {

  const divEl = useRef<HTMLDivElement>(null);
  const [{handlerId}, drop] = useDrop(() => ({
    accept: ItemType.RESERVATION,
    drop: (item: DragReservation, monitor) => {

      const selectX: number = (monitor.getInitialClientOffset()?.x || 0) - 100;
      const originStartX = item.originPosition;
      const selectIndex = Math.floor(((selectX - originStartX) / item.halfHourWidth));

      const selectTime = (hour * HOUR_MINUTES) + minutes;
      let stTime = selectTime;

      for (let i = 0; i < selectIndex; i++) {
        stTime -= HALF_HOUR
      }
      let eTime = selectTime;
      for (let i = selectIndex; i < item.count; i++) {
        eTime += HALF_HOUR;
      }
      if (stTime / HOUR_MINUTES < TIMES.length) {
        stTime = HOUR_MINUTES * TIMES.length;
      }

      if (eTime / HOUR_MINUTES > TIMES.length * 2) {
        eTime = HOUR_MINUTES * TIMES.length * 2
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
    <div ref={divEl} className={styles.room_col_sub} data-id={handlerId} data-index={index} data-hour={hour}
         data-minutes={minutes}></div>
  )
}
export default RowItem