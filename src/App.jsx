import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Todos from "./pages/Todos";
import TodoDetails from "./pages/TodoDetails";
import CreateTodo from "./pages/CreateTodo";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Todos />} />
          <Route exact path="/todo" element={<Todo />} />
          <Route exact path="/createtodo" element={<CreateTodo />} />
          <Route path="/todo/:id" element={<TodoDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
