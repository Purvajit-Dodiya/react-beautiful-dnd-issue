import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import Test from "./Test";

function App() {
  return (
    <div>
      <Test classcomponent={true}></Test>
    </div>
  );
}

export default App;
