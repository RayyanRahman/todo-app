import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Todo({ todo }) {
  // Function for deleting the todo task
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  // Function for handling todo task completion
  const handleComplete = async (todo) => {
    let currentTime = Date.now();
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
      lastUpdatedTime: currentTime,
    });
  };
  return (
    <div className="todo">
      <p
        style={{ textDecoration: todo.completed && "line-through" }}
        className="list"
      >
        {todo.task}
      </p>
      <div>
        <button
          className="button-complete"
          onClick={() => handleComplete(todo)}
        >
          <CheckCircleIcon className="icons" />
        </button>

        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon className="icons" />
        </button>
      </div>
    </div>
  );
}
export default Todo;
