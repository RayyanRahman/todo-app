import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddTodo() {
  // State for managing the input value
  const [task, setTask] = useState("");

  // Function for adding the todo task
  const handleAdd = async (e) => {
    e.preventDefault();
    // Checking if the task is not an empty string
    let currentTime = Date.now();
    if (task !== "") {
      // Adding a new document to the "todos" collection in Firestore
      await addDoc(collection(db, "todos"), {
        task, // Task content
        completed: false, // Default to not completed
        lastUpdatedTime: currentTime,
      });
      // Clearing the input field after adding the task
      setTask("");
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <h1 className="heading">Todo App</h1>
      <div className="input-container">
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
