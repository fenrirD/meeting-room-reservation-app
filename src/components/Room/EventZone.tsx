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
  const startLeft = Number(startHour) % 9 + (startMinute === '30' ? 0.5 : 0)
  const calc = (Number(endHour) - Number(startHour)) + ((Number(endMinute) - Number(startMinute)) ? 0.5 : 0)
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
  console.log('EventComponent render =>', data)
  // console.log('drag data=>',data, "???", handlerId)
  return (
    <div style={{
      width: `${colWidth * calc}px`,
      height: '50px',
      backgroundColor: 'red',
      top: '0px',
      position: 'absolute',
      left: `${((colWidth) * startLeft / width) * 100}%`,
      zIndex: isDragging ? 0 : 2,
      opacity: isDragging ? 0.3 : 1
    }} ref={div} onClick={handleEventClick} data-testid={handlerId}>
      {data.name}<br/>
      {data.time}
    </div>
  )
})

export default EventZone