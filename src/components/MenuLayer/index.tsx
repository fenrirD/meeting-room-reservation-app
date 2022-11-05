import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";

export default function MenuLayer({open, handleClose, reservation, handleConfirm}:any) {
  console.log('reservation', reservation,reservation.roomName)
  const [event, setEvent] = useState({
    roomName:reservation.roomName,
    name:'',
    reason:'',
    time:reservation.time
  });

  const handleClick = () => {
    console.log('!!!!!! handle',event)
    handleConfirm(event)
  }
  const onChange = (e:any) => {
    console.log(e,"change", event)
    setEvent({
      ...event,
      [e.target.id]:e.target.value,
    })
  }

  useEffect(()=>{
    console.log('MenuLayer' , event)
    setEvent({
      roomName:reservation.roomName,
      name:'',
      reason:'',
      time:reservation.time
    })
  },[reservation])

  console.log(event)
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{event.roomName}룸: 회의실 예약 설정</DialogTitle>
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
            value={event.name}
          />
          <DialogContentText>
            예약 목적
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
            value={event.reason}
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
            value={reservation.time}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
