import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../Redux/Actions";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const isReg = useSelector((state) => state.isReg);
  const dispatch = useDispatch();
  const register = () => {
    axios
      .post("http://localhost:3001/user/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(username);
        setConfirmMessage("User registred ...");
        dispatch(registerUser());
      });
  };
  return (
    <div className="Register">
      <h1>Registration</h1>
      <div className="RegisterForm">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
        <h2 style={{ color: "Green", textAlign: "center" }}>
          {confirmMessage}
        </h2>
      </div>
    </div>
  );
}

export default Register;
