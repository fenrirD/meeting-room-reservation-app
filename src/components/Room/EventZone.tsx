import React, {memo, useEffect, useRef} from "react";
import useResize from "../../hook/useResize";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {updateReservation} from "../../reudx/reservationSlice";

interface DropResult {
  name: string
}

const EventZone = memo(function EventZone ({roomName, events, handleClickEvent, dragUpdateData, testData}: any)  {
  console.log('rerender Event Zone', events)
  const eventDiv = useRef<HTMLDivElement>(null);
  const {width, height} = useResize(eventDiv);
  return (
    <div className='event_zone' ref={eventDiv} >
      {events && events.map((data: any, idx: any) => {
        return <EventComponent data={data} width={width} handleClickEvent={handleClickEvent}
                               key={`evt_${roomName}_${idx}`} dragUpdateData={dragUpdateData} testData={testData}/>
      })}

    </div>
  )
})
const EventComponent = memo(function EventComponent ({data, width, handleClickEvent, dragUpdateData, testData}: any) {

  const div = useRef(null);
  //1. 일단은 시작지점을 구한다

  const [startTime, endTime] = data?.time.split('~');
  const [startHour, startMinute] = startTime.split(':');
  const [endHour, endMinute] = endTime.split(':');
  const colWidth = width / 9
  const colMWidth = width / 18 // 30분 단위로 계산
  const startLeft = Number(startHour) % 9 + (startMinute === '30' ? 0.5 : 0)
  const calc = ((Number(endHour) * 60 + (Number(endMinute)) - Number(startHour)* 60 + - Number(startMinute) )) / 30
  const dispatch = useDispatch()
  const handleEventClick = (e: any) => {
    console.log('handleEventClick', data)
    handleClickEvent(data)
  }
  const [{isDragging,handlerId}, drag] = useDrag(() => ({
    type: 'box',
    item: ()=> {
      console.log('item?',data)
      return data
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<any>()
      console.log('drag event', item, dropResult, monitor.getItem())
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
    }),
  }),[data])

  drag(div)
  console.log('EventComponent render =>', data, calc)
  // console.log('drag data=>',data, "???", handlerId)
  return (
    <div>

      <div style={{
        width: `${colMWidth * calc}px`,
        height: '50px',
        backgroundColor: 'red',
        top: '0.5rem',
        position: 'absolute',
        left: `${((colWidth) * startLeft / width) * 100}%`,
        zIndex: isDragging ? 0 : 2,
        opacity: isDragging ? 0.3 : 1
      }} ref={div} onClick={handleEventClick} data-testid={handlerId}>
        <div className='resize_start'></div>
        <div className='resize_end'></div>
        {data.name}<br/>
        {data.time}
      </div>
    </div>
  )
})

export default EventZone