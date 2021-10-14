import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { authError } from "../../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(authError());
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, [localStorage.getItem("loggedIn")]);

  return (
    <div className="Navbar">
      {loggedIn ? (
        <>
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/upload">Upload</a>
          <a href="/login">
            <button onClick={logout}>Logout</button>
          </a>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </>
      )}
    </div>
  );
}

export default Navbar;
