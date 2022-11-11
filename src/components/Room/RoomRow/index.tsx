import React, {useEffect, useRef, useState} from "react";
import Reservation from "../../ReservationLayout";
import RowItem from "./RowItem";
import {TIMES} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {openMenuLayer} from "../../../reudx/menuLayerSlice";
import {ReservationInfo, RoomData} from "../../../types";
import Utils from "../../../utils";
import {clearResizeReservation, selectResizeReservation,} from "../../../reudx/resizeReservationSlice";
import styles from '../styles.module.css';


const RoomRow = ({roomName}: any) => {
  // 룸의 드래그 이벤트 등록을 위한 REF
  const roomValEL = useRef<HTMLDivElement>(null);
  // Drag 상태를 체크
  const [isDrag, setIsDrag] = useState<Boolean>(false);
  // 새롭게 등록할 예약 일정
  const [roomData, setRoomData] = useState<RoomData>({});
  // css 지우기 위한 방법인데 이건 변경할 예정 굳이 무브에 담을 필요 x
  // const [target, setTarget] = useState<any>([]);

  const resizeReservation = useSelector(selectResizeReservation);

  const dispatch = useDispatch()
  //TODO 이 부분은 어떻게 사용할지 고민
  // const a = useCallback(_.throttle((e: any) => {
  //   const n = target.filter((div: HTMLDivElement) => div.dataset.id !== e.dataset.id)
  //   setTarget([...n, e])
  // }, 500), [target])


  const handleMouseMove = (e: any) => {
    if (isDrag && e.target.dataset.id) {
      e.target.classList.add(styles.room_row_move)
    }
  }


  const registerReservation = (param: ReservationInfo) => dispatch(openMenuLayer(param))

  const HandleMouseUp = (e: any) => {
    e.preventDefault()
    if (roomValEL?.current && isDrag && e.target instanceof HTMLDivElement) {
      const {hour, minutes} = e.target.dataset;
      const selectTime = Utils.stringTimeToMinutes(Utils.stringToStringTime(hour, minutes));
      const beforeTime = roomData.firstMinutes || 0;

      // endTime 은 항상 30분을 더해줘야함.
      const startTime = Utils.minutesToStringTime(Math.min(selectTime, beforeTime));
      const endTime = Utils.minutesToStringTime(Math.max(selectTime, beforeTime) + 30);

      setIsDrag(false)
      //초기화
      setRoomData({})
      registerReservation({
        roomName,
        startTime,
        endTime,
      })

    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (roomValEL?.current && e.target instanceof HTMLDivElement) {
      const {hour, minutes} = e.target.dataset;
      setRoomData((v) => ({...v, firstMinutes: Utils.stringTimeToMinutes(Utils.stringToStringTime(hour, minutes))}))
      setIsDrag(true);
    }

  }


  useEffect(() => {
    if (roomValEL.current && isDrag) {
      roomValEL.current.addEventListener("mousemove", handleMouseMove)
      roomValEL.current.addEventListener("mouseup", HandleMouseUp)
      roomValEL.current.addEventListener("mouseleave", handleMouseLeave)
    } else if (!isDrag) {
      const htmlCollection = Array.from(document.getElementsByClassName(styles.room_row_move));
      for (const element of htmlCollection) {
        element.classList.remove(styles.room_row_move)
      }
    }
    return () => {
      if (roomValEL.current) {
        roomValEL.current.removeEventListener("mousemove", handleMouseMove)
        roomValEL.current.removeEventListener("mouseup", HandleMouseUp)
        roomValEL.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isDrag])


  const handleMouseLeave = (e: any) => {
    e.preventDefault();
    if (isDrag) {
      HandleMouseUp(e)
    }

    if (resizeReservation.isResizeReservation) {
      dispatch(clearResizeReservation())
    }
  }

  return (
    <div className={styles.room_row}>
      <Reservation roomName={roomName} ref={roomValEL}/>
      <div/>
        <div className={styles.room_row_col} ref={roomValEL} onMouseDown={handleMouseDown} >
        {TIMES.map((hour, idx) =>
          <div key={`${roomName}_time_${idx}`}>
            <RowItem roomName={roomName} key={`time_${roomName}_0_${hour}`} index={0} hour={hour}
                   minutes={0}/>
            <RowItem roomName={roomName} key={`time_${roomName}_1_${hour}`} index={1} hour={hour}
                   minutes={30}/>
          </div>
        )}

      </div>
    </div>
  )
}
export default RoomRow