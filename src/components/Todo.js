import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo({ todo, handleComplete, handleDelete }) {
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
          <CheckCircleIcon id="i" />
        </button>

        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
export default Todo;
