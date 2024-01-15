import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddTodo() {
  const [task, setTask] = useState("");

  // function for adding the todo task
  const handleAdd = async (e) => {
    e.preventDefault();
    if (task !== "") {
      await addDoc(collection(db, "todos"), {
        task,
        completed: false,
      });
      setTask("");
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <h1 className="heading">Todo App</h1>
      <div className="input_container">
        <input
          type="text"
          placeholder="Enter task todo here..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="btn">
          Add
        </button>
      </div>
    </form>
  );
}
export default AddTodo;
