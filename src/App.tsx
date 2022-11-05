import React, {useRef} from 'react';
import Main from "./components/Main";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "./reudx/hooks";
import {registerReservation} from "./reudx/reservationSlice";

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const reservation = useAppSelector((state) => {
    console.log(state,"count")
    return state.reservation
  })
  const dispatch = useAppDispatch()
  // dispatch(registerReservation())
  // dispatch({type:''})
  console.log('count',count, useSelector, reservation)

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend} >
        <Main/>
      </DndProvider>
    </div>
  );
}

export default App;
