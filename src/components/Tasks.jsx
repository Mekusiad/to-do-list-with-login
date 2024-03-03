import { useContext } from "react";
import { DataBaseContext } from "../context/DataBaseProvider";

import Task from "./Task";

import "../styles/Tasks.css";

const Tasks = () => {
  const { userTasks } = useContext(DataBaseContext);

  return (
    <div className="container-tasks">
      {userTasks.map((userTask) => (
        <Task userTask={userTask} />
      ))}
    </div>
  );
};

export default Tasks;
