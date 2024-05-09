import React from "react";
import { useSelector } from "react-redux";
import storage from "../images/store.jpeg";

const StatsBox = ({ todoId }) => {
  const todos = useSelector((state) => state.initialTodo.todos);
  const currentTodo = todos.find((todo) => todo.id === todoId);

  if (!currentTodo) return null;

  const totalTasks = currentTodo.todotasks.length;
  const completedTasks = currentTodo.todotasks.filter(
    (task) => task.completed
  ).length;
  const incompleteTasks = totalTasks - completedTasks;
  const completionPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <>
      <div className="statsbox">
        <div className="statsimage">
          <img src={storage} alt="storage"></img>
        </div>
        <div className="statsdata">
          <div className="totaldatabar">
            <span className="value">Total</span>
            <div className="total-progressbar tablet:w-10/12 pc:w-9/12">
              <div
                className="totalprogress"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="count">
              <span>{totalTasks}</span>
            </div>
          </div>
          <div className="completedatabar">
            <span className="value">Complete</span>
            <div className="complete-progressbar tablet:w-8/12 pc:w-7/12">
              <div
                className="completeprogress"
                style={{
                  width: `${(completedTasks / totalTasks) * 100}%`,
                  backgroundColor: "green",
                }}
              ></div>
            </div>
            <div className="count laptop:w-6 laptop:h-6">
              <span>{completedTasks}</span>
            </div>
          </div>
          <div className="incompletedatabar">
            <span className="value">Incomplete</span>
            <div className="incomplete-progressbar tablet:w-8/12 pc:w-7/12">
              <div
                className="incompleteprogress"
                style={{
                  width: `${(incompleteTasks / totalTasks) * 100}%`,
                  backgroundColor: "red",
                }}
              ></div>
            </div>
            <div className="count">
              <span>{incompleteTasks}</span>
            </div>
          </div>
          <div className="completiondatabar">
            <span className="value">Completion</span>
            <div className="completion-progressbar tablet:w-8/12 pc:w-7/12">
              <div
                className="completionprogress"
                style={{
                  width: `${completionPercentage}%`,
                  backgroundColor:
                    completionPercentage === 100 ? "green" : "red",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsBox;
