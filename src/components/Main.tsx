import React from "react";
import '../App.css'
import MenuLayer from "./MenuLayer";
import RoomLayout from "./RoomLayout";

const Main = () => {

  return (
    <div className='main'>
      <RoomLayout/>
      <MenuLayer/>
    </div>
  )
}


export default Main