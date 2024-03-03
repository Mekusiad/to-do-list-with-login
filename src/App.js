import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataBaseContextProvider from "./context/DataBaseProvider";

function App() {
  return (
    <div className="App">
      <DataBaseContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </DataBaseContextProvider>
    </div>
  );
}

export default App;
