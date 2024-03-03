import { authService } from "./auth";

import axios from "axios";

export const dataUserTasks = {
  async getUserTasks() {
    const user = await authService.getLoggedUser();
    const URI = `http://localhost:3001/getUserTasks/${user.id}`;

    const result = await axios.get(URI, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    return result.data.tasks;
  },

  async saveUserTask(data) {
    const user = await authService.getLoggedUser();
    const URL = `http://localhost:3001/addTask/${user.id}`;

    try {
      const result = await axios({
        headers: { Authorization: `Bearer ${user.token}` },
        url: URL,
        method: "post",
        data: data,
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  async removeUserTask(idTask) {
    const user = await authService.getLoggedUser();
    const URL = `http://localhost:3001/deletePersonTask/${user.id}/${idTask}`;

    try {
      const result = await axios({
        headers: { Authorization: `Bearer ${user.token}` },
        url: URL,
        method: "delete",
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  async updateUserTask(idTask, data) {
    console.log(data);
    const user = await authService.getLoggedUser();
    const URL = `http://localhost:3001/updatedUserTask/${user.id}/${idTask}`;

    try {
      const result = await axios({
        headers: { Authorization: `Bearer ${user.token}` },
        url: URL,
        method: "put",
        data: data,
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  async completedUserTask(idTask) {
    const user = await authService.getLoggedUser();

    const URL = `http://localhost:3001/updatedCompletedPersonTask/${user.id}/${idTask}`;

    try {
      const result = await axios({
        headers: { Authorization: `Bearer ${user.token}` },
        url: URL,
        method: "put",
      });

      return result;
    } catch (error) {
      return error;
    }
  },
};
