import { AiOutlineEdit } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

import { useContext } from "react";
import { DataBaseContext } from "../context/DataBaseProvider";
import { dataUserTasks } from "../services/dataUserTasks";

import "../styles/Task.css";
import { dataUser } from "../services/dataUser";

const Task = ({ userTask }) => {
  const {
    modifyOutput,
    setModifyOutput,
    userTasks,
    setUserTasks,
    title,
    setTitle,
    description,
    setDescription,
    showEditInput,
  } = useContext(DataBaseContext);

  const handleDeleteTask = async (idTaskClicked) => {
    const idUSer = await dataUser.getUser();

    userTasks.filter((task) => task._id !== idTaskClicked);

    await dataUserTasks.removeUserTask(idTaskClicked);
    const newTasks = await dataUserTasks.getUserTasks(idUSer);
    setUserTasks(newTasks);
    setModifyOutput(!modifyOutput);
  };

  const handleCompletedTask = async (idTaskClicked) => {
    const idUSer = await dataUser.getUser();

    userTasks.map((task) => {
      if (task._id === idTaskClicked) {
        return { ...task, completed: !task.completed };
      }
    });

    await dataUserTasks.completedUserTask(idTaskClicked);
    const newTasks = await dataUserTasks.getUserTasks(idUSer);

    setUserTasks(newTasks);
    setModifyOutput(!modifyOutput);
  };

  return (
    <div className="container-task">
      <div
        className="container-left"
        onClick={() => handleCompletedTask(userTask._id)}
      >
        <div className={`task-title ${userTask.completed ? "completed" : ""}`}>
          {userTask.title}
        </div>
        {showEditInput && (
          <input
            className="input-edit"
            type="text"
            placeholder="Descrição."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        )}
        <div
          className={`task-description ${userTask.completed ? "opacity" : ""}`}
        >
          {userTask.description}
        </div>
        {showEditInput && (
          <input
            className="input-edit"
            type="text"
            placeholder="Descrição."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        )}
      </div>
      <div className="container-right">
        <button>
          <AiOutlineEdit />
        </button>
        <button onClick={(e) => handleDeleteTask(userTask._id)}>
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default Task;
