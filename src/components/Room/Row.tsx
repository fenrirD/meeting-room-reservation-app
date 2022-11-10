import React, {useCallback, useEffect, useRef, useState} from "react";
import Reservation from "../ReservationLayout";
import RowItem from "./RowItem";
import {TIMES} from "../../constants";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {openMenuLayer} from "../../reudx/menuLayerSlice";
import {ReservationInfo, RoomData} from "../../types";
import Utils from "../../utils";
import {clearResizeReservation, selectResizeReservation,} from "../../reudx/resizeReservationSlice";


const Row = ({roomName}: any) => {
  // 룸의 드래그 이벤트 등록을 위한 REF
  const roomValEL = useRef<HTMLDivElement>(null);
  // Drag 상태를 체크
  const [isDrag, setIsDrag] = useState<Boolean>(false);
  // 새롭게 등록할 예약 일정
  const [roomData, setRoomData] = useState<RoomData>({});
  // css 지우기 위한 방법인데 이건 변경할 예정 굳이 무브에 담을 필요 x
  const [target, setTarget] = useState<any>([]);


  // 리사이즈는 리팩토링은 드래그 후
  const [isResizeDrag, setIsResizeDrag] = useState<Boolean>(false);
  const [resizeTarget, setResizeTarget] = useState<any>(null)

  const resizeReservation = useSelector(selectResizeReservation);
  // console.log('resizeReservation', resizeReservation)

  const dispatch = useDispatch()
  //TODO 이 부분은 어떻게 사용할지 고민
  const a = useCallback(_.throttle((e: any) => {
    const n = target.filter((div: HTMLDivElement) => div.dataset.id !== e.dataset.id)
    // console.log('mouseup', n, e.dataset.id)
    setTarget([...n, e])
  }, 500), [target])


  const mouseMove = (e: any) => {
    if (isDrag && e.target.dataset.id) {
      e.target.classList.add('test_css')
    }
  }


  const registerReservation = (param: ReservationInfo) => dispatch(openMenuLayer(param))

  const mouseUp = (e: any) => {
    e.preventDefault()
    if (roomValEL?.current && isDrag && e.target instanceof HTMLDivElement) {
      const {hour, minutes} = e.target.dataset;
      const selectTime = Utils.stringTimeToMinutes(Utils.stringToStringTime(hour, minutes));
      const beforeTime = roomData.firstMinutes || 0;

      // endTime 은 항상 30분을 더해줘야함.
      const startTime = Utils.minutesToStringTime(Math.min(selectTime, beforeTime));
      const endTime = Utils.minutesToStringTime(Math.max(selectTime, beforeTime) + 30);

      console.log('mouseup!', e, e.target, selectTime, beforeTime)
      setIsDrag(false)
      //초기화
      setRoomData({})
      registerReservation({
        roomName,
        startTime,
        endTime,
      })
      // e.target.classList.remove('test_css')
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (roomValEL?.current && e.target instanceof HTMLDivElement) {
      const {hour, minutes} = e.target.dataset;
      console.log('mouse down', hour, minutes, e.target.dataset.hour)
      setRoomData((v) => ({...v, firstMinutes: Utils.stringTimeToMinutes(Utils.stringToStringTime(hour, minutes))}))
      setIsDrag(true);
    }

  }

  // const resizeMouseMove = (e: any) => {
  //   const {isResizeReservation, resizeTarget, resizeDirection} = resizeReservation;
  //   if (isResizeReservation && resizeTarget) {
  //     const {startTime, endTime} = resizeTarget;
  //     const standardsTime = Utils.stringTimeToMinutes(resizeDirection === 'left' ? endTime : startTime)
  //     const moveTIme = Utils.stringTimeToMinutes(Utils.stringToStringTime(e.target.dataset.hour, e.target.dataset.minutes))
  //     const stTime = Math.min(standardsTime, moveTIme);
  //     const edTime = standardsTime === moveTIme ? moveTIme + 30 : Math.max(standardsTime, moveTIme);
  //
  //     const newData = {
  //       ...resizeTarget,
  //       startTime: Utils.minutesToStringTime(stTime),
  //       endTime: Utils.minutesToStringTime(edTime + (edTime === (60 * 17 + 30) ? 30 : 0))
  //     }
  //     console.log('left resize', newData)
  //
  //     dispatch(updateReservation(newData))
  //   }
  // }


  useEffect(() => {
    if (roomValEL.current && isDrag) {
      console.log('mouseup call befor', target)
      roomValEL.current.addEventListener("mousemove", mouseMove)
      roomValEL.current.addEventListener("mouseup", mouseUp)
      roomValEL.current.addEventListener("mouseleave", handleMouseLeave)
    } else if (!isDrag) {
      const htmlCollection = Array.from(document.getElementsByClassName('test_css'));
      for (const element of htmlCollection) {
        element.classList.remove('test_css')
      }
    }
    return () => {
      if (roomValEL.current) {
        roomValEL.current.removeEventListener("mousemove", mouseMove)
        roomValEL.current.removeEventListener("mouseup", mouseUp)
        roomValEL.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isDrag, target])


  const handleMouseLeave = (e: any) => {
    e.preventDefault();
    if (isDrag) {
      mouseUp(e)
    }

    if (resizeReservation.isResizeReservation) {
      dispatch(clearResizeReservation())
    }
  }

  return (
    <div className='room_value'>
      <Reservation roomName={roomName} ref={roomValEL}/>
      <div/>
      {/*<div className='room_col' ref={roomValEL} onMouseDown={handleMouseDown} onMouseUp={mouseUp}*/}
      {/*     onMouseLeave={handleMouseLeave}>*/}

        <div className='room_col' ref={roomValEL} onMouseDown={handleMouseDown} >
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
export default Row