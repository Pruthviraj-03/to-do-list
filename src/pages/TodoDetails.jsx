import React from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TodoDetails = () => {
  const { id } = useParams();

  const todo = useSelector((state) =>
    state.initialTodo.todos.find((todo) => todo.id === id)
  );

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <>
      <Todo todo={todo} />
    </>
  );
};

export default TodoDetails;
