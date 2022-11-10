import React from "react";
import './index.css'
// import Header from "./Haeder";
import Body from "./Body";
import {Header} from '../Grid'
import {TIMES} from "../../constants";

const Room = () => {

  return (
    <>
      <Header names={TIMES}/>
      <Body/>
    </>
  )
}

export default Room