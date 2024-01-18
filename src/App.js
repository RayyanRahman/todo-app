import "./App.css";
import React from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

function App() {
 

  // Render the main structure of the App
  return (
    <div className="App">
      <div className="add-todo-cont">
        <AddTodo />
      </div>

      <Todo />
    </div>
  );
}

export default App;
