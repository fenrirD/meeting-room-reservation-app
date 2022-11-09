import React, {memo, useRef} from "react";
import useResize from "../../hook/useResize";
import {useDrag} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {isOverlapReservation, selectReservation} from "../../reudx/reservationSlice";
import {openMenuLayer} from "../../reudx/menuLayerSlice";
import {DragReservation, Reservation, ReservationInfo} from "../../type";
import {AppDispatch} from "../../reudx/store";
import {HOUR_COUNT, ItemType, MINUTES_COUNT} from "../../utills/data/sampleData";
import Utils from "../../utills";
import {
  clearResizeReservation,
  selectResizeReservation,
  setResizeReservation
} from "../../reudx/resizeReservationSlice";

const EventZone = memo(function EventZone ({roomName,  isResizeDrag, handleLeftResizeClick, handleLeftResizeClearClick}: any)  {

  const eventDiv = useRef<HTMLDivElement>(null);
  const {width} = useResize(eventDiv);

  const reservations = useSelector(selectReservation).reduce((acc: any, cur: any) => {
    return ({
      ...acc,
      [cur.roomName]: acc[cur.roomName] ? [...acc[cur.roomName], cur] : [cur]
    })
  }, {})

  return (
    <div className='event_zone' ref={eventDiv} >
      {reservations[roomName] && reservations[roomName].map((reservation:Reservation, idx: any) => {
        return <EventComponent reservation={reservation} componentWidth={width}
                               key={`evt_${roomName}_${idx}`} isResizeDrag={isResizeDrag} handleLeftResizeClearClick={handleLeftResizeClearClick} handleLeftResizeClick={handleLeftResizeClick}/>
      })}
    </div>
  )
})
const EventComponent = memo(function EventComponent ({reservation, componentWidth, isResizeDrag, handleLeftResizeClick, handleLeftResizeClearClick}: any) {

  const div = useRef(null);
  // const [isDrag, setIsDrag] = useState<Boolean>(false);
  //1. 일단은 시작지점을 구한다
  const resizeReservation = useSelector(selectResizeReservation);
  console.log('EventComponent', reservation)
  const {startTime, endTime} = reservation;
  const [startHour, startMinutes] = startTime.split(':').map((v:string)=>Number(v));

  const colWidth = componentWidth / HOUR_COUNT

  const count = (Utils.stringTimeToMinutes(endTime) - Utils.stringTimeToMinutes(startTime)) / 30
  // EventComponent 의 30분당 길이: EventZone 길이 / 30분의 개수
  const halfHourWidth = componentWidth / MINUTES_COUNT;
  const width = halfHourWidth * count;
  // EventComponent 시작 위치(퍼센트): (시작시간 % 시간의 개수) + (시작 분 / 60) / 시간의 개수 * 100
  const startValue = (startHour % HOUR_COUNT + (startMinutes /60));
  const leftPosition = startValue / HOUR_COUNT * 100;

  const dispatch = useDispatch<AppDispatch>()

  const handleEventClick = (data:ReservationInfo) => {
    dispatch(openMenuLayer(data))
  }

  const [{isDragging,handlerId}, drag] = useDrag(() => ({
    type: ItemType.RESERVATION,
    item:  {
        ...reservation,
        count,
        originPosition: colWidth * startValue,
        halfHourWidth,
    },
    end: (item:DragReservation, monitor) => {
      const dropResult = monitor.getDropResult<Reservation>()
      // console.log('drag monitor - drag',coords,monitor,'getInitialClientOffset:',monitor.getInitialClientOffset(),'getInitialSourceClientOffset:',monitor.getInitialSourceClientOffset(),',getClientOffset:',monitor.getClientOffset(), ', getSourceClientOffset:',monitor.getSourceClientOffset(), ',d:',monitor.getDifferenceFromInitialOffset())
      if (item && dropResult) {
        console.log(item)
        dispatch(isOverlapReservation(dropResult))
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }),[reservation,componentWidth])

  drag(div)

  const resizeMouseDown =(e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('resize',)
    if(e.target instanceof HTMLDivElement){
      dispatch(setResizeReservation({
        isResizeReservation:true,
        resizeTarget:reservation,
        resizeDirection: e.target.dataset.resizeDirection,
      }))
      handleLeftResizeClick(reservation)
      e.target.style.zIndex = '0';
    }

    // e.target.style.cursor='ew-resize'
  }

  // useEffect로 변경 감지해야함.
  const resizeMouseUp =() => {
    if(resizeReservation.isResizeReservation){
      dispatch(clearResizeReservation())
    }
  }

  return (
    <div>
      <div style={{
        width: `${width}px`,
        height:'100%',
        position: 'absolute',
        left: `${leftPosition}%`,
        zIndex: isDragging || reservation.id===resizeReservation?.resizeTarget?.id && resizeReservation.isResizeReservation ? 0 : 2,
        opacity: isDragging || reservation.id===resizeReservation?.resizeTarget?.id && resizeReservation.isResizeReservation ? 0.3 : 1,
      }}   data-testid={handlerId} onMouseUp={resizeMouseUp} >
        <div className='resize_start' onMouseDown={resizeMouseDown} data-resize-direction='left' />
        <div className='resize_end' onMouseDown={resizeMouseDown} data-resize-direction='right' />
        <div onClick={()=>handleEventClick(reservation)} ref={div} style={{
          height: '50px',
          backgroundColor: '#f4a686e3',
          margin: '0.5rem',
          borderRadius:'0.5rem'

        }}>
          {reservation.name}<br/>
          {reservation.startTime} ~ {reservation.endTime}
        </div>
      </div>
    </div>
  )
})

export default EventZone