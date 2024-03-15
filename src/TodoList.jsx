import React, { useState, createContext } from "react";
//import ReactDOM from "react-dom";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import { v1 as uuid } from "uuid";
import "./TodoList.css";
export const TodoContext = createContext();

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: uuid(),
      task: "task 1",
      completed: false,
      createdDate: getDate(),
      endDate: "",
    },
    {
      id: uuid(),
      task: "task 2",
      completed: true,
      createdDate:  getDate(),
      endDate: getDate(),
    },
  ]);

  const create = (newTodo) => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const update = (id, updtedTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed, endDate: getDate() };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todosList = todos.map((todo) => (
    <Todo
      toggleComplete={toggleComplete}
      update={update}
      remove={remove}
      key={todo.id}
      todo={todo}
      getDate={getDate}
    />
  ));

  return (
    <div className="TodoList">
      <h1>
        Todo List <span>A simple React Todo List App</span>
      </h1>
      <ul>{todosList}</ul>
      <TodoContext.Provider value={{ createTodo: create, getDate: getDate }}>
        <NewTodoForm />
      </TodoContext.Provider>
    </div>
  );
}

export default TodoList;
