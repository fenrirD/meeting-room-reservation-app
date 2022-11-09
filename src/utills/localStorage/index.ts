import {Reservation} from "../../type";


const localStorage = (()=>{

  const storage = window.localStorage;

  const getReservation = ():Reservation[] => {
    const reservation:string = storage.getItem("reservation")!;
    return JSON.parse(reservation);
  }

  const setReservation = () => {

  }

  return {
    getReservation
  }
})()

export default localStorage