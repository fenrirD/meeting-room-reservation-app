import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerReservation, updateReservation} from "../../reudx/reservationSlice";
import {closeMenuLayer, selectMenuLayer} from "../../reudx/menuLayerSlice";
import {ReservationInfo} from "../../type";

export default function MenuLayer() {

  const dispatch = useDispatch();
  const {isOpen, reservationInfo} = useSelector(selectMenuLayer);

  const [reservation, setReservation] = useState<ReservationInfo>(reservationInfo);

  const handleRegisterClick = () => {
    console.log('!!!!!! handle', reservation)
    // handleConfirm()
    dispatch(registerReservation(reservation))
    handleClose()
  }
  const handleEditClick = () => {
    dispatch(updateReservation(reservation))
    handleClose()
  }

  const handleClose = () => {
    dispatch(closeMenuLayer())
  };

  const onChange = (e: any) => {
    console.log(e, "change", reservation)
    setReservation({
      ...reservation,
      [e.target.id]: e.target.value,
    })
  }

  useEffect(() => {
    setReservation(reservationInfo)
  }, [reservationInfo])

  // console.log(event)
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{reservation.roomName}룸: 회의실 예약 설정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            예약자명
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
            value={reservation.name||''}
          />
          <DialogContentText>
            예약 목적
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="purpose"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
            value={reservation.purpose ||''}
          />
          <DialogContentText>
            예약 시간
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            value={reservation.time || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          {
            reservation.id ?
              <Button onClick={handleEditClick}>수정</Button>
              :
              <Button onClick={handleRegisterClick}>등록</Button>
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}
