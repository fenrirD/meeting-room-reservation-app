import React, {ForwardedRef, forwardRef, memo, ReactNode, useRef} from "react";
import useResize from "../../hook/useResize";
import {useSelector} from "react-redux";
import {selectReservation} from "../../reudx/reservationSlice";
import {ReservationType, RoomNameType} from "../../types";
import {COLORS} from "../../constants";
import Reservation from "../Reservation";
import styles from './styles.module.css';


interface ReservationLayoutProps {
  readonly children?: ReactNode;
  readonly roomName: RoomNameType;
}

const ReservationLayout = memo(forwardRef(function ReservationLayout({roomName}:ReservationLayoutProps , ref: ForwardedRef<HTMLDivElement>) {

  const eventDiv = useRef<HTMLDivElement>(null);
  const {width} = useResize(eventDiv);

  const reservations = useSelector(selectReservation).reduce((acc: any, cur: ReservationType) => {
    return ({
      ...acc,
      [cur.roomName]: acc[cur.roomName] ? [...acc[cur.roomName], cur] : [cur]
    })
  }, {})

  return (
    <div className={styles.reservation_layout} ref={eventDiv}>
      {reservations[roomName] && reservations[roomName].map((reservation: ReservationType, idx: number) => {
        return <Reservation reservation={reservation} componentWidth={width || 0}
                            color={COLORS[(reservation.id - 1) % COLORS.length]}
                            key={`evt_${roomName}_${idx}`} ref={ref}/>
      })}
    </div>
  )
}))


export default ReservationLayout