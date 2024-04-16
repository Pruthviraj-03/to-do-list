import React, { useState } from "react";
import {
  FaSearch,
  FaCheck,
  FaArrowLeft,
  FaEllipsisV,
  FaPlus,
} from "react-icons/fa";
import StatsBox from "../components/StatsBox";
import ChildTodo from "../components/ChildTodo";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addTodoTask,
  categorizeTodos,
  updateTodoTitle,
  doneTodo,
} from "../slice/initialTodoSlice";
import { nanoid } from "@reduxjs/toolkit";

const Todo = ({ todo }) => {
  const [openStats, setOpenStats] = useState(false);
  const [search, setSearch] = useState("");
  const [todoText, setTodoText] = useState("");
  const [isBackButtonVisible, setBackButtonVisible] = useState(false);

  const dispatch = useDispatch();

  const handleOpenStats = () => {
    setOpenStats(!openStats);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddTodoTask = () => {
    if (todoText.trim() !== "") {
      dispatch(
        addTodoTask({
          todoId: todo.id,
          task: {
            id: nanoid(),
            value: todoText,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        })
      );
      setTodoText("");
    }
  };

  const handleTitleChange = (e, todoId) => {
    const editedTitle = e.target.value;
    dispatch(updateTodoTitle({ todoId, title: editedTitle }));
  };

  const handleFilterTodos = (category) => {
    console.log("Selected category:", category);
    dispatch(categorizeTodos({ category }));
  };

  const handleDoneClick = () => {
    dispatch(
      doneTodo({
        id: todo.id,
        title: todo.title,
        todotasks: todo.todotasks,
      })
    );
    setBackButtonVisible(true);
  };

  return (
    <>
      <div className="secondpage">
        <div className="todo lg:w-1/3 md:w-1/2">
          <div className="underbox">
            <div className="titlebar">
              <input
                placeholder="Title"
                value={todo.title}
                onChange={(e) => handleTitleChange(e, todo.id)}
              />
              {isBackButtonVisible ? (
                <Link to="/">
                  <div
                    className="backButton md:mt-2 md:ml-2 lg:mt-2 lg:ml-8"
                    title="back"
                  >
                    <FaArrowLeft />
                  </div>
                </Link>
              ) : (
                <div
                  className="donetodo md:mt-2 md:ml-2 lg:mt-2 lg:ml-8"
                  onClick={handleDoneClick}
                >
                  <FaCheck />
                </div>
              )}
            </div>

            <div className="datebar">
              {todo.updatedAt !== todo.createdAt && (
                <span>{formatDate(todo.updatedAt)}</span>
              )}
            </div>

            <div className="addtodobar">
              <input
                placeholder="Add todo"
                value={todoText}
                onChange={handleInputChange}
              />
              <div className="addTodo" title="add" onClick={handleAddTodoTask}>
                <FaPlus />
              </div>
            </div>

            <form>
              <div className="searchBar">
                <input
                  type="text"
                  placeholder="Search Todos"
                  value={search}
                  onChange={handleSearch}
                  title="search todo"
                />
                <div className="searchIcon" title="search">
                  <FaSearch />
                </div>
              </div>
            </form>

            <div className="statsbar">
              <span>Stats of your todos</span>
              <div
                className="horizontaldots"
                title="open the stats"
                onClick={handleOpenStats}
              >
                <FaEllipsisV />
              </div>
            </div>

            {openStats && <StatsBox todoId={todo.id} />}

            <div
              className={`allTodos ${
                openStats ? "stats-open" : "stats-closed"
              }`}
            >
              <ChildTodo search={search} todo={todo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
