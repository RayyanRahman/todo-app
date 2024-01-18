import "./App.css";
import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { collection, query, onSnapshot } from "firebase/firestore";
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

      // Sort todosArray based on lastUpdatedTime in descending order
      todosArray.sort((a, b) => b.lastUpdatedTime - a.lastUpdatedTime);
      setTodos(todosArray);
    });

    // Cleanup function to unsubscribe from snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Render the main structure of the App
  return (
    <div className="App">
      <div className="add-todo-cont">
        <AddTodo />
      </div>
      <div className="todo-container">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            // handleComplete={handleComplete}
            // deleteDoc={deleteDoc}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
