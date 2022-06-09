import React from 'react';
import { useState } from 'react';
import Axios from 'axios';

import './Login.css';
import { SiCivicrm } from "react-icons/si";

const Login = ({ LogIn }) => {

  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post(`https://tritonsrm.com/api/auth/login`, {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response)
      if (response.data.auth) {
        LogIn(response.data);
        console.log(response)
        localStorage.setItem("x-access-token", response.data.token);
      } else {
        setMessage(response.data.message);
      }
    });
  }

  return (
    <div className="login-page">
      <div id="login-container">

        <div id="login-heading">
          <h2>LOG IN</h2>
          <h3>{process.env.REACT_APP_BACKEND_URL}</h3>
        </div>

        <div className="inputs">
          <label>Username</label>
          <input onChange={(e) => setUsername(e.target.value)}></input>
        </div>

        <div className="inputs">
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>

        <p id='login-message'>{message}</p>

        <button id="login-btn" onClick={login}>Log In</button>
        
      </div>
    </div>
  );
}

export default Login;
