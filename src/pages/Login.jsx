import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";

import ReactLoading from "react-loading";

import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [clickButton, setClickButton] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const verifyInputs = async (e) => {
    setClickButton(true);
    e.preventDefault();

    try {
      const res = await authService.authenticate(email, password);

      authService.setLoggedUser(res.data);
      alert("Usuário logado com sucesso!!!");
      sucess(res);
    } catch (error) {
      console.error(error);
      alert("Erro ao efetuar login.");
    }

    setClickButton(false);
  };

  const sucess = (response) => {
    navigate("/Home");
  };

  return (
    <form action="" className="login">
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="Insira seu e-mail."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="Insira sua senha."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {!clickButton ? (
        <button disabled={clickButton} onClick={(e) => verifyInputs(e)}>
          Login
        </button>
      ) : (
        <button>
          {" "}
          <ReactLoading type={"spin"} height={25} width={25} />
        </button>
      )}

      <div className="link-sign-up">
        <p>Não tem uma conta? </p>
        <a href={() => false} onClick={() => navigate("/signUp")}>
          Cadastre-se!
        </a>
      </div>
    </form>
  );
};

export default Login;
