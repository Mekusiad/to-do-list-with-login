import { useState } from "react";

import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import { dataUser } from "../services/dataUser";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [ddd, setDdd] = useState(null);
  const [number, setNumber] = useState(null);

  const verifyInputs = async (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !password || !ddd || !number) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    const phone = { ddd, number };
    const data = { name, lastName, email, password, phone };

    const result = await dataUser.saveUserDataBase(data);

    if (result.status === 201) {
      sucess(result);
    } else {
      emailExist(result.response.data.message);
    }
  };

  const sucess = (response) => {
    alert("Usuário cadastrado com sucesso!!!");
    navigate("/login");
  };

  const emailExist = (message) => {
    alert(message);
    setEmail(null);
    return;
  };

  return (
    <form action="" className="sign-up">
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          placeholder="Seu nome."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input
          id="lastName"
          type="text"
          placeholder="Seu sobrenome."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="Seu e-mail."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="Sua senha."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="phones">
        <label htmlFor="phone">Phone: </label>
        <input
          id="ddd"
          type="text"
          placeholder="ddd de sua cidade."
          value={ddd}
          onChange={(e) => setDdd(e.target.value)}
        />
        <input
          id="phone"
          type="text"
          placeholder="Seu telefone."
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button onClick={(e) => verifyInputs(e)}>SignUp</button>
    </form>
  );
};

export default SignUp;
