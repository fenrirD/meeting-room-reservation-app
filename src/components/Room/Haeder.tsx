import React from "react";
import {TIMES} from "../../utills/data/sampleData";
import {Time} from "../../type";

const Header = () => {
  return (
    <div className="header">
      <div>
        <div></div>
      </div>
      {
        TIMES.map((time:Time)=> (<div className="header_label" key={`header_${time}`}>{time}</div>))
      }
    </div>
  )
}
export default Header