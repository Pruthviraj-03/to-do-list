import React, { useState, useEffect } from "react";
import { FaTrash, FaCopy, FaSyncAlt, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteTodoTask,
  copyTodo,
  checkboxTodo,
  updateTodo,
} from "../slice/initialTodoSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChildTodo = ({ search, todo }) => {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [updatedText, setUpdatedText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredTasks = todo.todotasks.filter((task) =>
      task.value.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTodos(filteredTasks);
  }, [search, todo]);

  const copyTodoNoti = () => {
    toast.info("Great!, You copied the todo task.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const deleteTodoNoti = () => {
    toast.error("Oops!, You deleted the todo task.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTodoTask({ taskId }));
    deleteTodoNoti();
  };

  const handleCopy = (taskValue) => {
    dispatch(copyTodo({ taskValue }));
    copyTodoNoti();
  };

  const handleCheckboxChange = (taskId) => {
    dispatch(checkboxTodo({ taskId }));
  };

  const handleUpdate = (taskId) => {
    dispatch(updateTodo({ taskId, taskNewText: updatedText }));
    setEditingTaskId(null);
  };

  const handleTaskValueChange = (newValue) => {
    setUpdatedText(newValue);
  };

  const handleStartEditing = (taskId) => {
    setEditingTaskId(taskId);
    const taskToUpdate = todo.todotasks.find((task) => task.id === taskId);
    setUpdatedText(taskToUpdate.value);
  };

  return (
    <>
      {filteredTodos.map((task, index) => (
        <div key={index} className="todopagenext">
          <div key={task.id} className="todovalue">
            <input
              type="checkbox"
              defaultChecked={task.completed}
              onChange={() => handleCheckboxChange(task.id)}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  value={updatedText}
                  onChange={(e) => handleTaskValueChange(e.target.value)}
                />
                <div className="buttons">
                  <div
                    className="updatebutton"
                    title="update todo"
                    onClick={() => handleUpdate(task.id)}
                  >
                    <FaCheck />
                  </div>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={task.value}
                  readOnly
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                />
                <div className="buttons">
                  <div
                    className="copybutton"
                    title="copy todo"
                    onClick={() => handleCopy(task.value)}
                  >
                    <FaCopy />
                  </div>
                  <div
                    className="updatebutton"
                    title="edit todo"
                    onClick={() => handleStartEditing(task.id)}
                  >
                    <FaSyncAlt />
                  </div>
                  <div
                    className="deleteTodos"
                    title="delete todo"
                    onClick={() => handleDelete(task.id)}
                  >
                    <FaTrash />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      <ToastContainer />
    </>
  );
};

export default ChildTodo;
