import { createContext, useState } from "react";

export const DataBaseContext = createContext(null);

const DataBaseContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [showEditInput, setShowEditInput] = useState(false);
  const [modifyOutput, setModifyOutput] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");

  const context = {
    modifyOutput,
    setModifyOutput,
    userProfile,
    setUserProfile,
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
  };

  return (
    <DataBaseContext.Provider value={context}>
      {children}
    </DataBaseContext.Provider>
  );
};

export default DataBaseContextProvider;
