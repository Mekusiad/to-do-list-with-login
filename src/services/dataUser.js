import axios from "axios";

import { authService } from "./auth";

export const dataUser = {
  async getUser() {
    const user = await authService.getLoggedUser();

    const URI = `http://localhost:3001/getUser/${user.id}`;

    const result = await axios.get(URI, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.person;
  },

  async saveUserDataBase(data) {
    const URL = "http://localhost:3001/signUp";

    try {
      const result = await axios({
        url: URL,
        method: "post",
        data: data,
      });

      return result;
    } catch (error) {
      return error;
    }
  },
};
