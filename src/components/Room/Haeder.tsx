import React from "react";
import {TIMES} from "../../utills/data/sampleData";

const Header = () => {


  return (
    <div className="header">
      <div>
        <div></div>
      </div>
      {TIMES.map((header)=>
        (<div className="header_label" key={`header_${header}`}>{header}</div>))
      }
    </div>
  )
}
export default Header