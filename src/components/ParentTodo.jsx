import React from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../slice/initialTodoSlice";
import "../index.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ParentTodo = ({ search }) => {
  const deleteTodoNoti = () => {
    toast.error("Oops!, You delete the todo.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      style: {
        background: "#ff6f61",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
        fontWeight: "bold",
      },
    });
  };

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.initialTodo.todos);

  const handleDelete = (todoId, e) => {
    e.stopPropagation();
    console.log("Deleting todo with ID:", todoId);
    dispatch(deleteTodo(todoId));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {filteredTodos.map((todo, index) => (
        <Link key={index} to={`/todo/${todo.id}`}>
          <div
            key={todo.id}
            className="box md:w-40 md:h-44 md:ml-2 lg:w-44 lg:h-48 lg:ml-3"
            title="open todo"
          >
            <h3>{todo.title}</h3>
            <div
              className="deletetodo"
              title="delete todo"
              onClick={(e) => handleDelete(todo.id, e)}
            >
              <FaTrash />
            </div>
          </div>
        </Link>
      ))}

      <ToastContainer />
    </>
  );
};

export default ParentTodo;
