import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const savedTodos = localStorage.getItem("todos");
  const [todos, setTodos] = useState(JSON.parse(savedTodos) || []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  function addTodo(title, desc) {
    if (editIndex >= 0) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { title, desc };
      setTodos(updatedTodos);
      setEditIndex(-1);
    } else {
      setTodos([...todos, { title, desc }]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(name, desc);
    setName("");
    setDesc("");
  }

  function handleEdit(index) {
    setName(todos[index].title);
    setDesc(todos[index].desc);
    setEditIndex(index);
  }

  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 flex justify-center">Todo List</h1>
        <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">Task Name</label>
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
              placeholder="Enter task description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700"
          >
            {editIndex >= 0 ? "Update Task" : "Add Task"}
          </button>
        </form>
        <div className="grid gap-4">
          {todos.map((todo, idx) => (
            <Todo
              key={idx}
              title={todo.title}
              desc={todo.desc}
              onEdit={() => handleEdit(idx)}
              onDelete={() => handleDelete(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Todo({ title, desc, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 shadow-sm flex flex-col space-y-2">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{desc}</p>
      <div className="flex space-x-2 justify-end">
        <button
          onClick={onEdit}
          className="bg-indigo-500 text-white rounded px-4 py-1 hover:bg-indigo-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white rounded px-4 py-1 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;
