import React, { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  updateDoc,
  deleteDoc,
  doc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });

      // Sort todosArray based on lastUpdatedTime in descending order
      todosArray.sort((a, b) => b.lastUpdatedTime - a.lastUpdatedTime);
      setTodos(todosArray);
    });

    // Cleanup function to unsubscribe from snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

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
    <div className="todo-container">
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
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

            <button
              className="button-delete"
              onClick={() => handleDelete(todo.id)}
            >
              <DeleteIcon className="icons" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
