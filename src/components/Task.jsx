import { AiOutlineEdit } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

import { useContext, useState } from "react";
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
    setShowEditInput,
    titleEdit,
    setTitleEdit,
    descriptionEdit,
    setDescriptionEdit,
  } = useContext(DataBaseContext);

  const handleShowInputTask = async (idTaskClicked) => {
    setShowEditInput(!showEditInput);
  };

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

  const handleUpdateTask = async (idTaskClicked) => {
    const idUSer = await dataUser.getUser();

    if (titleEdit === "" || descriptionEdit === "") return;

    const data = { titleEdit, descriptionEdit };

    await dataUserTasks.updateUserTask(idTaskClicked, data);
    const newTasks = await dataUserTasks.getUserTasks(idUSer);

    console.log("saiu");
    setUserTasks(newTasks);
    setShowEditInput(!showEditInput);
    setTitleEdit("");
    setDescriptionEdit("");
    setModifyOutput(!modifyOutput);
  };

  return (
    <div className="container-task">
      <div
        className="container-left"
        onClick={() => handleCompletedTask(userTask._id)}
      >
        {!showEditInput && (
          <div
            className={`task-title ${userTask.completed ? "completed" : ""}`}
          >
            {userTask.title}
          </div>
        )}
        {showEditInput && (
          <input
            className="input-edit"
            type="text"
            placeholder="Tarefa."
            value={titleEdit}
            onChange={(e) => setTitleEdit(e.target.value)}
          ></input>
        )}

        {!showEditInput && (
          <div
            className={`task-description ${
              userTask.completed ? "opacity" : ""
            }`}
          >
            {userTask.description}
          </div>
        )}
        {showEditInput && (
          <input
            className="input-edit"
            type="text"
            placeholder="Descrição."
            value={descriptionEdit}
            onChange={(e) => setDescriptionEdit(e.target.value)}
          ></input>
        )}
      </div>

      {!showEditInput && (
        <div className="container-right">
          <button onClick={() => handleShowInputTask()}>
            <AiOutlineEdit />
          </button>
          <button onClick={(e) => handleDeleteTask(userTask._id)}>
            <IoCloseSharp />
          </button>
        </div>
      )}
      {showEditInput && (
        <div className="container-right">
          <button
            className={`${showEditInput ? "green" : ""}`}
            onClick={() => handleUpdateTask(userTask._id)}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
