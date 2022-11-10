import React from "react";
import {Time} from "../../../types";


const Header = ({names}: {names:Time[]}) => {
  return (
    <div className="header">
      <div>
        <div></div>
      </div>
      {
        names.map((name:Time)=> (<div className="header_label" key={`header_${name}`}>{name}</div>))
      }
    </div>
  )
}
export default Header