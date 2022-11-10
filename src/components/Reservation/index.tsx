import React, {ForwardedRef, forwardRef, memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  clearResizeReservation,
  selectResizeReservation,
  startResizeReservation
} from "../../reudx/resizeReservationSlice";
import ReservationProps, {DragReservation, ReservationType, ReservationInfo, ResizeReservation} from "../../types";
import {HOUR_COUNT, ItemType, MINUTES_COUNT} from "../../constants";
import Utils from "../../utils";
import {AppDispatch} from "../../reudx/store";
import {isOverlapReservation, selectReservation, updateReservation} from "../../reudx/reservationSlice";
import {openMenuLayer} from "../../reudx/menuLayerSlice";
import {useDrag} from "react-dnd";
import styles from './styles.module.css';

const Reservation = memo(forwardRef(function Reservation({
                                                           reservation,
                                                           componentWidth,
                                                           color
                                                         }: ReservationProps, ref: ForwardedRef<HTMLDivElement>) {
  const div = useRef(null);
  //1. 일단은 시작지점을 구한다
  const resizeReservation = useSelector(selectResizeReservation);
  const [currentReservation, setCurrentReservation] = useState<ResizeReservation>(reservation)
  const [selReservation] = useSelector(selectReservation).filter(({id})=>id===currentReservation.id);
  const [isResize, setIsResize] = useState(false)
  // const {startTime, endTime} = reservation;

  const {startTime, endTime} = currentReservation;
  const [startHour, startMinutes] = startTime.split(':').map((v: string) => Number(v));
  const colWidth = componentWidth / HOUR_COUNT
  const count = (Utils.stringTimeToMinutes(endTime) - Utils.stringTimeToMinutes(startTime)) / 30
  // EventComponent 의 30분당 길이: Index 길이 / 30분의 개수
  const halfHourWidth = componentWidth / MINUTES_COUNT;
  const width = halfHourWidth * count;
  // EventComponent 시작 위치(퍼센트): (시작시간 % 시간의 개수) + (시작 분 / 60) / 시간의 개수 * 100
  const startValue = (startHour % HOUR_COUNT + (startMinutes / 60));
  const leftPosition = startValue / HOUR_COUNT * 100;


  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setCurrentReservation(reservation)
  }, [reservation])

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      if (ref?.current && resizeReservation.isResizeReservation && isResize) {
        ref.current.style.cursor = 'ew-resize'
        ref.current.addEventListener("mousemove", resizeMouseMove)
        ref.current.addEventListener("mouseup", resizeMouseUp)
        ref.current.addEventListener("mouseleave", handleMouseLeave)
      }
      if (resizeReservation.isResizeReservation === false) {
        setIsResize(false)
      }
      return () => {
        if (ref.current) {
          ref.current.removeEventListener("mousemove", resizeMouseMove)
          ref.current.removeEventListener("mouseup", resizeMouseUp)
          ref.current.removeEventListener("mouseleave", handleMouseLeave)
          ref.current.style.cursor = 'default'
        }

      }
    }

  }, [resizeReservation.isResizeReservation, currentReservation])


  const handleMouseLeave = (e: any) => {
    e.preventDefault();
    if (resizeReservation.isResizeReservation) {
      dispatch(clearResizeReservation())
      dispatch(updateReservation(currentReservation))
    }
  }

  const resizeMouseMove = (e: any) => {
    if (e.target instanceof HTMLDivElement) {
      if (resizeReservation.isResizeReservation && currentReservation && isResize) {
        const {resizeDirection} = currentReservation;

        const {startTime, endTime} = selReservation;
        const standardsTime = Utils.stringTimeToMinutes(resizeDirection === 'left' ? endTime : startTime)
        const moveTIme = Utils.stringTimeToMinutes(Utils.stringToStringTime(e.target.dataset.hour, e.target.dataset.minutes))

        const stTime = Math.min(standardsTime, moveTIme);
        const edTime = standardsTime === moveTIme ? moveTIme + 30 : Math.max(standardsTime, moveTIme);

        const newData = {
          ...currentReservation,
          startTime: Utils.minutesToStringTime(stTime),
          endTime: Utils.minutesToStringTime(edTime + (resizeDirection === 'left' ? 0 : 30))
        }
        setCurrentReservation(newData)
      }
    }
  }

  const handleEventClick = (data: ReservationInfo) => {
    dispatch(openMenuLayer(data))
  }

  const [{isDragging, handlerId}, drag] = useDrag(() => ({
    type: ItemType.RESERVATION,
    item: {
      ...currentReservation,
      count,
      originPosition: colWidth * startValue,
      halfHourWidth,
    },
    end: (item: DragReservation, monitor) => {
      const dropResult = monitor.getDropResult<ReservationType>()
      if (item && dropResult) {
        dispatch(isOverlapReservation(dropResult))
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }), [currentReservation, componentWidth])

  drag(div)

  const resizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target instanceof HTMLDivElement) {
      const resizeDirection = e.target.dataset.resizeDirection
      if (resizeDirection === 'left' || resizeDirection === 'right') {
        setIsResize(true)
        dispatch(startResizeReservation())
        setCurrentReservation({
          ...reservation,
          resizeDirection,
        })
        e.target.style.zIndex = '0';
      }

    }

  }
  
  const resizeMouseUp = () => {
    if (resizeReservation.isResizeReservation && isResize) {
      dispatch(clearResizeReservation())
      dispatch(updateReservation(currentReservation))
    }
  }

  return (
    <div>
      <div style={{
        width: `${width}px`,
        left: `${leftPosition}%`,
        zIndex: isDragging || isResize && resizeReservation.isResizeReservation ? 0 : 2,
        opacity: isDragging || isResize && resizeReservation.isResizeReservation ? 0.3 : 1,
      }} data-testid={handlerId} onMouseUp={resizeMouseUp} className={styles.reservation}>
        <div className={styles.resize_left} onMouseDown={resizeMouseDown} data-resize-direction='left'/>
        <div className={styles.resize_right} onMouseDown={resizeMouseDown} data-resize-direction='right'/>
        <div onClick={() => handleEventClick(reservation)} ref={div} style={{
          backgroundColor: color,
        }}>
          {reservation.name}<br/>
          {reservation.startTime} ~ {reservation.endTime}
        </div>
      </div>
    </div>
  )
}))

export default Reservation