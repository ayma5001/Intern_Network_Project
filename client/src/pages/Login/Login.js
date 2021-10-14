import React, { useState } from "react";
import "./Login.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { signIn, authError } from "../../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  let history = useHistory();

  const login = () => {
    Axios.post("http://localhost:3001/user/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data?.auth) {
        setErrorMessage(response.data.message);
        dispatch(authError());
      } else {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.results[0].username);
        localStorage.setItem("token", response.data.token);
        history.push("/");
        dispatch(signIn());
        //  window.location.reload();
      }
    });
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="LoginForm">
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
        <button type="submit" onClick={login}>
          Login
        </button>
        {/* {loginStatus && <button onClick={userAuthenticated} >Check if Authenticated</button>}*/}
        <h2 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h2>
      </div>
    </div>
  );
}

export default Login;

/*
  const login = () => {
    console.log(username);
    axios
      .post("http://localhost:3001/user/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.loggedIn) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", response.data.username);
          history.push("/");
          window.location.reload();
        } else {
          setErrorMessage(response.data.message);
        }
      });
  };
  */

// const userAuthenticated = () => {
//   Axios.get("http://localhost:3001/user/isUserAuth", {
//     headers :{
//       "x-access-token":localStorage.getItem("token")
//     }
// }).then((response) => {
//   console.log(response)
// })
// }
