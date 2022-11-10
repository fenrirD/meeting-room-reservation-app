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
import {deleteReservation, registerReservation, updateReservation} from "../../reudx/reservationSlice";
import {closeMenuLayer, selectMenuLayer} from "../../reudx/menuLayerSlice";
import {ReservationInfo} from "../../types";

export default function MenuLayer() {

  const dispatch = useDispatch();
  const {isOpen, reservationInfo} = useSelector(selectMenuLayer);

  const [reservation, setReservation] = useState<ReservationInfo>(reservationInfo);
  const [isValidation, setIsValidation] = useState<boolean>(false)

  const handleRegisterClick = () => {
    const {name} = reservation
    if (name) {
      dispatch(registerReservation(reservation))
      handleClose()
    } else {
      alert("예약자명은 필수입니다.")
    }
  }

  const handleEditClick = () => {
    dispatch(updateReservation(reservation))
    handleClose()
  }

  const handleClose = () => {
    dispatch(closeMenuLayer())
  };

  const onChange = (e: any) => {
    setReservation({
      ...reservation,
      [e.target.id]: e.target.value,
    })
  }

  const handleDeleteClick = () => {
    dispatch(deleteReservation(reservation.id))
    dispatch(closeMenuLayer())
  }

  useEffect(() => {
    setReservation(reservationInfo)
  }, [reservationInfo])

  useEffect(() => {
    if (reservation.name) {
      setIsValidation(true)
    } else {
      setIsValidation(false)
    }

  }, [reservation.name])

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
            label="이름"
            required
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
            value={reservation.name || ''}
          />
          <DialogContentText>
            예약 목적
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="purpose"
            label="목적"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
            value={reservation.purpose || ''}
          />
          <DialogContentText>
            예약 시간
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="time"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={`${reservation.startTime} ~ ${reservation.endTime}`}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color={"warning"}>취소</Button>
          {reservation.id && <Button variant="contained" onClick={handleDeleteClick} color={"error"}>삭제</Button>}
          {
            reservation.id ?
              <Button onClick={handleEditClick} color={"primary"} variant="contained"
                      disabled={!isValidation}>수정</Button>
              :
              <Button onClick={handleRegisterClick} color={"primary"} variant="contained"
                      disabled={!isValidation}>등록</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
