import React, {useRef} from "react";
import '../App.css'
import Room from "./Room";

const Main = () => {

  const roomValEL = useRef<HTMLDivElement>(null);

  const tableEl = useRef<HTMLTableElement>(null)
  // const mouseMove = (e: any) => {
  //   console.log('mouse move!', e.target)
  //   e.target.style.backgroundColor = 'red'
  // }
  //
  // const mouseUp = (e: any) => {
  //   console.log('mouseup!')
  //   e.preventDefault()
  //   if (roomValEL?.current) {
  //     roomValEL.current.removeEventListener("mousemove", mouseMove)
  //     roomValEL.current.removeEventListener("mouseup", mouseUp)
  //   }
  // }
  // const handleMouseDown = (e: any) => {
  //   console.log('click mouse!')
  //   if (roomValEL?.current) {
  //     console.log(roomValEL)
  //     roomValEL.current.addEventListener("mouseup", mouseUp)
  //     roomValEL.current.addEventListener("mousemove", mouseMove)
  //   }
  //
  //   // console.log(e,'move')
  //   console.log(roomValEL)
  // }
  const handleDragEl = (e: any) => {
    // console.log('dragEL', e)
  }

  const handleDragStart = (e: any) => {
    console.log('dragstart', e)
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    console.log('DROP!!!', e)
  }

  const handleDragEnter = (e: any) => {
    console.log("enter:", e)
  }
  console.log('Main re render?')
  return (

    <div className='main'>
      <Room/>
    </div>
    // <div className="main">
    //   <div className="header">
    //     <div>
    //       <div></div>
    //     </div>
    //     <div className="header_label">9</div>
    //     <div className="header_label">10</div>
    //     <div className="header_label">11</div>
    //     <div className="header_label">12</div>
    //     <div className="header_label">13</div>
    //     <div className="header_label">14</div>
    //     <div className="header_label">15</div>
    //     <div className="header_label">16</div>
    //     <div className="header_label">17</div>
    //   </div>
    //   <div className="body">
    //     <div className='flex_none'></div>
    //     <div className='real_time'>
    //       <div></div>
    //       <div className='time'>
    //         <div style={{height: '700px'}} className='time_son'></div>
    //         <div style={{left: "66%", position: 'absolute'}}>1</div>
    //       </div>
    //     </div>
    //     <div className="room">
    //       <div></div>
    //       <div className="room_name">
    //         <div>A</div>
    //         <div>B</div>
    //         <div>C</div>
    //         <div>D</div>
    //         <div>E</div>
    //         <div>F</div>
    //         <div>G</div>
    //         <div>H</div>
    //         <div>I</div>
    //         <div>J</div>
    //       </div>
    //       {/*<div className="room_val" ref={roomValEL} onMouseDown={handleMouseDown}>*/}
    //       <div className="room_val" ref={roomValEL}>
    //         <div className='room_value'>
    //           <div className='event_zone'>
    //             <div style={{
    //               width: '50px',
    //               height: '50px',
    //               backgroundColor: 'blue',
    //               top: '0px',
    //               position: 'absolute'
    //             }}></div>
    //             <div style={{
    //               width: '50px',
    //               height: '50px',
    //               backgroundColor: 'blue',
    //               top: '0px',
    //               position: 'absolute'
    //             }}></div>
    //           </div>
    //           <div></div>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='event_zone'>
    //             <div style={{
    //               width: '50px',
    //               height: '50px',
    //               backgroundColor: 'green',
    //               top: '0px',
    //               left: '100px',
    //               position: 'absolute'
    //             }}></div>
    //             <div style={{
    //               width: '50px',
    //               height: '50px',
    //               backgroundColor: 'blue',
    //               top: '0px',
    //               position: 'absolute'
    //             }}></div>
    //           </div>
    //           <div></div>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='event_zone'>
    //             <div style={{width: '50px', height: '50px', backgroundColor: 'red', top: '0px',}}></div>
    //             <div style={{width: '50px', height: '50px', backgroundColor: 'blue', top: '0px',}}></div>
    //           </div>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //         <div className='room_value'>
    //           <div className='room_col'>
    //             <div>9</div>
    //             <div>10</div>
    //             <div>11</div>
    //             <div>12</div>
    //             <div>13</div>
    //             <div>14</div>
    //             <div>15</div>
    //             <div>16</div>
    //             <div>17</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}


export default Main