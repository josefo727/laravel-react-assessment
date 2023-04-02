import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/tailwind.css"

type Todo = {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
};

const Welcome: React.FC = () => {
  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  useEffect(() => {
    if (username) {
      axios.get(`/api/todos?username=${username}`).then((response) => {
        setTodos(response.data);
      });
    }
  }, [username]);

  const createTodo = () => {
    axios
      .post("/api/todos", {
        title: newTodoTitle,
        description: newTodoDescription,
        username: username,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodoTitle("");
        setNewTodoDescription("");
      });
  };

  const toggleTodoCompletion = (todo: Todo) => {
    axios
      .put(`/api/todos/${todo.id}`, {
        ...todo,
        is_completed: !todo.is_completed,
      })
      .then((response) => {
        const updatedTodos = todos.map((t) => (t.id === todo.id ? response.data : t));
        setTodos(updatedTodos);
      });
  };

  const deleteTodo = (todoId: number) => {
    axios.delete(`/api/todos/${todoId}`).then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
    });
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to TODO App</h1>
        <input
          className="border border-gray-400 p-2 mb-4 w-full"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="mb-4">
          <input
            className="border border-gray-400 p-2 mb-2 w-full"
            placeholder="Enter new TODO title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <textarea
            className="border border-gray-400 p-2 mb-4 w-full"
            placeholder="Enter new TODO description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={createTodo}
            disabled={!newTodoTitle || !newTodoDescription || !username}
          >
            Add TODO
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="border-b border-gray-400 py-2">
              <input
                type="checkbox"
                checked={todo.is_completed}
                onChange={() => toggleTodoCompletion(todo)}
                className="mr-2"
              />
              <span className="font-semibold">{todo.title}</span>
              <p className="text-gray-600">{todo.description}</p>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Welcome;
