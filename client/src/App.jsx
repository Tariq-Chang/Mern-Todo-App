import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([{}]);
  const [todo, setTodo] = useState("");
  const [popup, setPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [todoId, setTodoId] = useState();

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:4000");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, [todos]);

  const createTask = async () => {
    setPopup(false);
    await axios.post("http://localhost:4000/todos/new", {
      text: todo,
    });

    setTodo("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:4000/todos/delete/${id}`);
  };

  const handleUpdate = async (id) => {
    setUpdatePopup(true);
    setTodoId(id);
    const response = await axios.get(`http://localhost:4000/todo/${id}`);
    setTodo(response.data.text);
  };

  const updateTodo = async () => {
    setUpdatePopup(false);
    await axios.put(`http://localhost:4000/todos/update/${todoId}`, { todo });
    setTodo("");
  };

  const toggleComplete = async (id) => {
    await axios.get(`http://localhost:4000/todos/complete/${id}`);
  };
  return (
    <div
      className={` flex flex-col items-center bg-primary font-poppins text-light h-screen overflow-x-scroll relative`}
    >
      <h1 className="text-2xl font-bold text-center tracking-wider py-8">
        Welcome, Tariq Hussain
      </h1>
      <p className="w-[80px] text-center">Tasks</p>
      <div
        className={`mt-4 max-w-[400px] mx-auto overflow-y-scroll ${
          popup ? "blur-md" : ""
        }`}
      >
        {todos.map((todo) => {
          return (
            <div className="flex justify-between items-center bg-secondary rounded-md px-4 py-2 my-4 shadow-xl">
              <p
                className={`w-80 mr-10 flex flex-wrap ${
                  todo.completed ? "line-through" : ""
                } px-2`}
              >
                {todo.text}
              </p>
              <div className="flex items-center justify-around px-2 py-2">
                <button
                  className="mx-1 rounded-full bg-green-500 w-[16px] h-[16px]"
                  onClick={() => toggleComplete(todo._id, todo.completed)}
                ></button>
                <button
                  className="mx-1 rounded-full bg-yellow-500 w-[16px] h-[16px]"
                  onClick={() => handleUpdate(todo._id)}
                ></button>
                <button
                  className="mx-1 rounded-full bg-red-500 w-[16px] h-[16px]"
                  onClick={() => deleteTodo(todo._id)}
                ></button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`${
          popup ? "block" : "hidden mt-[-400px]"
        }  absolute top-[20%] z-10 shadow-2xl`}
      >
        <div className=" flex flex-col items-center pt-10 bg-neutral-300 w-[400px] h-[200px] rounded-lg blur-0">
          <button
            className="text-sm absolute top-2 right-2 bg-red-600 w-[24px] h-[24px] rounded-full"
            onClick={() => setPopup(false)}
          >
            X
          </button>
          <input
            type="text"
            name="todo"
            placeholder="Enter Task"
            value={todo}
            className="bg-blue-600 text-white w-[90%] p-[10px] my-2 rounded text-lg placeholder-slate-400"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            className="w-[200px] bg-gray-900 px-2 py-2 rounded"
            onClick={createTask}
          >
            Create
          </button>
        </div>
      </div>

      <div
        className={`${
          updatePopup ? "block" : "hidden mt-[-400px]"
        }  absolute top-[20%] z-10 shadow-2xl`}
      >
        <div className=" flex flex-col items-center pt-10 bg-neutral-300 w-[400px] h-[200px] rounded-lg blur-0">
          <button
            className="text-sm absolute top-2 right-2 bg-red-600 w-[24px] h-[24px] rounded-full"
            onClick={() => {
              setUpdatePopup(false);
              setTodo("");
            }}
          >
            X
          </button>
          <input
            type="text"
            name="todo"
            placeholder="Enter Task"
            value={todo}
            className="bg-blue-600 text-white w-[90%] p-[10px] my-2 rounded text-lg placeholder-slate-400"
            onChange={(e) => todoId && setTodo(e.target.value)}
          />
          <button
            className="w-[200px] bg-gray-900 px-2 py-2 rounded"
            onClick={updateTodo}
          >
            Update
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full absolute bottom-10 items-center  shadow-gray-700 ">
        <button
          className=" bg-green-600 hover:bg-yellow-500 text-3xl w-[40px] h-[40px] shadow-xl rounded-full"
          onClick={() => setPopup(!popup)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default App;
