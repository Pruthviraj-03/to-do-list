import React, { useState } from "react";
import {
  FaSearch,
  FaCheck,
  FaArrowLeft,
  FaEllipsisV,
  FaPlus,
} from "react-icons/fa";
import StatsBox from "../components/StatsBox";
import TodoTask from "../components/TodoTask";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categorizeTodos, addTodo } from "../slice/initialTodoSlice";
import { nanoid } from "@reduxjs/toolkit";

const CreateTodo = () => {
  const [openStats, setOpenStats] = useState(false);
  const [search, setSearch] = useState("");
  const [todoText, setTodoText] = useState("");
  const [temporaryTodo, setTemporaryTodo] = useState({
    title: "",
    info: "",
    todotasks: [],
  });
  const [isBackButtonVisible, setBackButtonVisible] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const todo = useSelector((state) => state.initialTodo.todos);

  const handleOpenStats = () => {
    setOpenStats(!openStats);
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddTodoTask = () => {
    if (todoText.trim() !== "") {
      const newTask = {
        id: nanoid(),
        value: todoText,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Update temporaryTodo state with the new task
      setTemporaryTodo((prevTodo) => ({
        ...prevTodo,
        todotasks: [...prevTodo.todotasks, newTask],
      }));

      console.log("Task added:", newTask.value);

      setTodoText("");
    }
  };

  const handleFilterTodos = (category) => {
    console.log("Selected category:", category);
    dispatch(categorizeTodos({ category }));
  };

  const handleAddTodo = () => {
    const id = nanoid();
    const todotasks = [...temporaryTodo.todotasks]; // Copy temporaryTodo tasks
    dispatch(
      addTodo({
        id,
        title,
        todotasks,
      })
    );
    setBackButtonVisible(true);
    setTemporaryTodo({
      // Reset temporaryTodo state after adding todo
      title: "",
      info: "",
      todotasks: [],
    });
  };

  return (
    <>
      <div className="secondpage">
        <div className="todo tablet:w-3/5 tablet:h-3/5 tablet:p-1.5 laptop:w-1/3 laptop:p-1.5 pc:w-3/12 pc:h-2/3 pc:p-1.5">
          <div className="underbox">
            <div className="titlebar">
              <input
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
              {isBackButtonVisible ? (
                <Link to="/">
                  <div
                    className="backButton tablet:mt-2 tablet:ml-2 laptop:mt-1.5 laptop:ml-12 pc:mt-2 pc:ml-20"
                    title="back"
                  >
                    <FaArrowLeft />
                  </div>
                </Link>
              ) : (
                <div
                  className="donetodo tablet:mt-2 tablet:ml-2 laptop:mt-1.5 laptop:ml-12 pc:mt-2 pc:ml-20"
                  onClick={handleAddTodo}
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

            <div className="addtodobar tablet:mt-2 laptop:mt-1.5 pc:mt-3">
              <input
                className="pc:w-11/12"
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

            <div className="statsbar" todoId={todo.id}>
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
              <TodoTask search={search} todo={temporaryTodo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
