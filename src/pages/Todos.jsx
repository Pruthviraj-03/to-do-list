import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import ParentTodo from "../components/ParentTodo";
import { Link } from "react-router-dom";

const Todos = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("Search value:", e.target.value);
  };

  return (
    <>
      <div className="firstpage">
        <div className="todos tablet:w-3/5 tablet:h-3/5 laptop:w-1/3 pc:w-3/12 pc:h-2/3">
          <div className="underbox">
            <div className="topline tablet:text-3pc">
              <span>Create Your Todos</span>
            </div>

            <form>
              <div
                className="searchbar tablet:ml-11 pc:ml-14 pc:mt-5"
                title="search todo"
              >
                <div className="searchicon">
                  <FaSearch />
                </div>
                <input
                  className="pc:w-full"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search Todo"
                />
              </div>
            </form>

            <div className="todoboxes tablet:p-4 pc:p-4">
              <ParentTodo search={search} />
              <Link to="/createtodo">
                <div
                  className="addtodos tablet:top-1/2 tablet:left-1/2 tablet:mt-44 tablet:ml-36 laptop:top-1/2 laptop:left-1/2 laptop:mt-44 laptop:ml-32 pc:top-1/2 pc:left-1/2 pc:mt-44 pc:ml-36"
                  title="create todo"
                >
                  <FaPlus />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
