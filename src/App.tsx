import React, {useRef} from 'react';
import Main from "./components/Main";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Main/>
      </DndProvider>
    </div>
  );
}

export default App;
