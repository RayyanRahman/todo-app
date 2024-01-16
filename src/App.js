import "./App.css";
import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // State for managing the list of todos
  const [todos, setTodos] = useState([]);

   // useEffect to fetch todos from Firebase on component mount
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    // Cleanup function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  // Function for handling todo task completion
  const handleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  // Function for deleting the todo task
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // Render the main structure of the App
  return (
    <div className="App">
      <div className="addTodoCont">
        <AddTodo />
      </div>
      <div className="todo_container">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
