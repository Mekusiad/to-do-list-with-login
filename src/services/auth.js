import axios from "axios";

const URL = "http://localhost:3001/login";

const user = {
  id: "1",
  name: "Mauro",
  lastName: "Medeiros",
  email: "mauro@mauro.com",
  password: "123456",
  created_at: new Date(),
  updated_at: new Date(),
  last_login: new Date(),
  token: "123456",
};

export const authService = {
  // Definindo a função de login
  async authenticate(email, password) {
    const data = { email, password };

    const res = await axios({
      url: URL,
      method: "post",
      data: data,
    });

    return res;
  },

  async authenticateLocal(email, password) {
    if (user.email === email && user.password === password) {
      const data = {
        id: user.id,
        token: user.token,
        message: "Usuário autenticado com sucesso!",
      };

      return data;
    }
  },
  // Função para salvar o usuário logado no local storage
  setLoggedUser(data) {
    localStorage.setItem("user", JSON.stringify(data));
  },

  // Função responsável por recuperar o usuário logado do local storage
  getLoggedUser() {
    const data = localStorage.getItem("user");

    try {
      const parseData = JSON.parse(data);

      return parseData.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getLoggedUserLocal() {
    const data = localStorage.getItem("user");

    try {
      const parseData = JSON.parse(data);
      console.log(parseData);
      return parseData;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  cleanLoggedUser() {
    localStorage.clear();
  },
};
