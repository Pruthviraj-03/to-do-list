import React, { useState, useEffect } from "react";
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
  const [lastUpdateTime, setLastUpdateTime] = useState(todo.updatedAt);
  const [filterCategory, setFilterCategory] = useState("all");
  const dispatch = useDispatch();

  const handleOpenStats = () => {
    setOpenStats(!openStats);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLastUpdateTime(todo.updatedAt); // Update last update time when todo is changed
  }, [todo.updatedAt]);

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
    if (filterCategory !== category) {
      setFilterCategory(category); // Update local state
      dispatch(categorizeTodos({ category })); // Dispatch action to Redux store
    }
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
        <div className="todo tablet:w-3/5 tablet:h-3/5 tablet:p-1.5 laptop:w-1/3 laptop:p-1.5 pc:w-3/12 pc:h-2/3 pc:p-1.5">
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
                    className="backButton tablet:mt-2 tablet:ml-2 laptop:mt-1.5  pc:mt-2 pc:ml-20"
                    title="back"
                  >
                    <FaArrowLeft />
                  </div>
                </Link>
              ) : (
                <div
                  className="donetodo tablet:mt-2 tablet:ml-2 laptop:mt-1.5 laptop:ml-12 pc:mt-2 pc:ml-20"
                  onClick={handleDoneClick}
                >
                  <FaCheck />
                </div>
              )}
            </div>

            <div className="datebar">
              <span>{formatDate(new Date(lastUpdateTime))}</span>
            </div>

            <div className="addtodobar tablet:mt-2 laptop:mt-1.5 pc:mt-3">
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

            <div className="checktodos">
              <div
                className="activetodos"
                title="active todos"
                onClick={() => handleFilterTodos("active")}
              >
                <h3>active</h3>
              </div>
              <div
                className="completedtodos"
                title="completed todos"
                onClick={() => handleFilterTodos("completed")}
              >
                <h3>completed</h3>
              </div>
              <div
                className="alltodos"
                title="all todos"
                onClick={() => handleFilterTodos("all")}
              >
                <h3>all</h3>
              </div>
            </div>

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
