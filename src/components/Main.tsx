import React, {useRef} from "react";
import '../App.css'
import Room from "./Room";
import MenuLayer from "./MenuLayer";

const Main = () => {

  return (
    <div className='main'>
      <Room/>
      <MenuLayer/>
    </div>
  )
}


export default Main