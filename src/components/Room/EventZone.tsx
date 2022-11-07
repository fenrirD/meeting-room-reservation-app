import React, {memo, useEffect, useRef, useState} from "react";
import useResize from "../../hook/useResize";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {updateReservation} from "../../reudx/reservationSlice";
import {openMenuLayer} from "../../reudx/menuLayerSlice";
import {MenuLayer, ReservationInfo} from "../../type";

interface DropResult {
  name: string
}

const EventZone = memo(function EventZone ({roomName, events,  dragUpdateData, isResizeDrag, handleLeftResizeClick, handleLeftResizeClearClick}: any)  {

  const eventDiv = useRef<HTMLDivElement>(null);
  const {width, height} = useResize(eventDiv);
  return (
    <div className='event_zone' ref={eventDiv} >
      {events && events.map((data: any, idx: any) => {
        return <EventComponent data={data} width={width}
                               key={`evt_${roomName}_${idx}`} dragUpdateData={dragUpdateData} isResizeDrag={isResizeDrag} handleLeftResizeClearClick={handleLeftResizeClearClick} handleLeftResizeClick={handleLeftResizeClick}/>
      })}

    </div>
  )
})
const EventComponent = memo(function EventComponent ({data, width,  dragUpdateData, isResizeDrag, handleLeftResizeClick, handleLeftResizeClearClick}: any) {

  const div = useRef(null);
  // const [isDrag, setIsDrag] = useState<Boolean>(false);

  //1. 일단은 시작지점을 구한다

  const [startTime, endTime] = data?.time.split('~');
  const [startHour, startMinute] = startTime.split(':');
  const [endHour, endMinute] = endTime.split(':');
  const colWidth = width / 9
  const colMWidth = width / 18 // 30분 단위로 계산
  const startLeft = Number(startHour) % 9 + (startMinute === '30' ? 0.5 : 0)
  const calc = ((Number(endHour) * 60 + (Number(endMinute)) - Number(startHour)* 60 + - Number(startMinute) )) / 30

  const dispatch = useDispatch()
  const handleEventClick = (data:ReservationInfo) => {
    console.log('handleEventClick', data)
    // handleClickEvent(data)
    dispatch(openMenuLayer(data))
  }
  const [{isDragging,handlerId,coords}, drag] = useDrag(() => ({
    type: 'box',
    item: ()=> {
      console.log('item?',data,div,colMWidth * calc, colWidth * startLeft)
      //colWidth * startLeft 옮기기 전에 시작위치
      return {
        ...data,
        colLne: colMWidth * calc,
        calc: calc,
        originPosition: colWidth * startLeft,
        colMWidth,
      }
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<any>()
      // console.log('drag event', item, dropResult, monitor.getItem())
      console.log('drag monitor - drag',coords,monitor,'getInitialClientOffset:',monitor.getInitialClientOffset(),'getInitialSourceClientOffset:',monitor.getInitialSourceClientOffset(),',getClientOffset:',monitor.getClientOffset(), ', getSourceClientOffset:',monitor.getSourceClientOffset(), ',d:',monitor.getDifferenceFromInitialOffset())
      // console.log('getInitialClientOffset:',monitor.getInitialClientOffset(),'getInitialSourceClientOffset:',monitor.getInitialSourceClientOffset(),',getClientOffset:',monitor.getClientOffset(), ', getSourceClientOffset:',monitor.getSourceClientOffset(), ',d:',monitor.getDifferenceFromInitialOffset())
      if (item && dropResult) {
        console.log(item)
        dispatch(updateReservation(dropResult?.newItem))
        // dragUpdateData(dropResult?.newItem)
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      coords:monitor.getSourceClientOffset(),
    }),
  }),[data,width])

  drag(div)
  console.log('drag monitor',coords)
  console.log('EventComponent render =>', data, calc, colMWidth, colWidth , startLeft)

  const moseDown =(e:any) => {
    e.stopPropagation()
    console.log('resize down =>',e,data)
    handleLeftResizeClick(data)
    e.target.style.zIndex = 0;
  }

  // useEffect로 변경 감지해야함.
  const test =() => {
    if(isResizeDrag){
      handleLeftResizeClearClick()
    }
  }
  // const move = (e:any) => {
  //   if(isResizeDrag){
  //     // handleLeftResizeClearClick()
  //     console.log('reseize evt zone ',e)
  //   }
  // }
  // console.log('drag data=>',data, "???", handlerId)
  return (
    <div>
      <div style={{
        width: `${colMWidth * calc}px`,
        height: '50px',
        backgroundColor: '#f4a686e3',
        top: '0.5rem',
        position: 'absolute',
        left: `${((colWidth) * startLeft / width) * 100}%`,
        zIndex: isDragging || isResizeDrag ? 0 : 2,
        opacity: isDragging || isResizeDrag ? 0.3 : 1
      }}   data-testid={handlerId} onMouseUp={test} >
        <div className='resize_start' onMouseDown={moseDown}  ></div>
        <div className='resize_end'></div>
        <div onClick={()=>handleEventClick(data)} ref={div}>
          {data.name}<br/>
          {data.time}
        </div>
      </div>
    </div>
  )
})

export default EventZone