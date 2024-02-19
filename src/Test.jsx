import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DroppableComponent from "./DroppableComponent";
// fake data generator
const getItems = (count, unique) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item${unique}-${k}`,
    content: `item ${unique} ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Test extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      items: getItems(10, "one"),
      items2: getItems(10, "two"),
      items3: getItems(10, "three"),
      isDragging: false,
    };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragStart() {
    this.setState({
      isDragging: true,
    });
  }
  onDragEnd(result) {
    console.log(
      "src,dest",
      result.source.droppableId,
      result.destination.droppableId
    );
    // dropped outside the list
    if (!result.destination) {
      this.setState({
        isDragging: false,
      });
    } else if (
      result.source.droppableId == "droppable" &&
      result.destination.droppableId == "droppable"
    ) {
      const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
      );

      this.setState({
        items: items,
        isDragging: false,
      });
    } else if (
      result.source.droppableId == "droppable2" &&
      result.destination.droppableId == "droppable2"
    ) {
      const items = reorder(
        this.state.items2,
        result.source.index,
        result.destination.index
      );

      this.setState({
        items2: items,
        isDragging: false,
      });
    } else if (
      result.source.droppableId == "droppable3" &&
      result.destination.droppableId == "droppable3"
    ) {
      const items = reorder(
        this.state.items2,
        result.source.index,
        result.destination.index
      );

      this.setState({
        items2: items,
        isDragging: false,
      });
    } else {
      console.log(result.source, result.destination);
      this.setState({
        isDragging: false,
      });
    }
  }

  render() {
    return (
      <div className="app">
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
        >
          <div
            className="context_container"
            style={{
              backgroundColor: this.state.isDragging ? "bisque" : "lightblue",
              // height: this.state.isDragging ? "" : "400px",
              height: "400px",
              overflowY: "scroll",
              // overflowY: this.state.isDragging ? "hidden" : "scroll",
            }}
          >
            <DroppableComponent
              id="droppable"
              items={this.state.items}
              isDragging={this.state.isDragging}
            />
            <DroppableComponent
              id="droppable2"
              items={this.state.items2}
              isDragging={this.state.isDragging}
            />
            <DroppableComponent id="droppable3" items={this.state.items3} />
          </div>
        </DragDropContext>
        <h2>test</h2>
        <h2>test</h2>
        <h2>test</h2>
        <h2>test</h2>
      </div>
    );
  }
}

export default Test;
