import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import { dataUser } from "../services/dataUser";
import { dataUserTasks } from "../services/dataUserTasks";

import "../styles/Home.css";
import Tasks from "../components/Tasks";
import { DataBaseContext } from "../context/DataBaseProvider";

const Home = () => {
  const [show, setShow] = useState(false);

  const {
    modifyOutput,
    userProfile,
    setUserProfile,
    setUserTasks,
    title,
    setTitle,
    description,
    setDescription,
  } = useContext(DataBaseContext);

  const navigate = useNavigate();

  const logout = () => {
    authService.cleanLoggedUser();
    verifyLoggedUser();
  };

  const getUser = async () => {
    const user = await dataUser.getUser();

    setUserProfile(user);
  };

  const getTaskUser = async () => {
    const tasksUSer = await dataUserTasks.getUserTasks();

    setUserTasks(tasksUSer);
    if (!tasksUSer) setUserTasks([]);
  };

  const handleAddTask = async () => {
    if (title === "" || description === "") return;
    const data = { title, description };

    await dataUserTasks.saveUserTask(data);
    getTaskUser();
    setTitle("");
    setDescription("");
  };

  const verifyLoggedUser = async () => {
    const loggedUser = await authService.getLoggedUser();
    if (!loggedUser) {
      console.log("Você não está logado!");
      navigate("/");
      return;
    }
    setShow(true);
  };

  useEffect(() => {
    verifyLoggedUser();
    getUser();
    getTaskUser();
  }, []);

  // useEffect(() => {
  //   getTaskUser();
  //   console.log(modifyOutput);
  // }, [modifyOutput]);

  return (
    <>
      {show && (
        <div className="home">
          <h3>Bem vindo, {userProfile.name}!</h3>
          <div className="container">
            <div className="container-input">
              <input
                type="text"
                placeholder="Tarefa."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Descrição."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={() => handleAddTask()}>Adicionar</button>
            </div>
            <div className="container-output">
              <Tasks />
            </div>
          </div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Home;
