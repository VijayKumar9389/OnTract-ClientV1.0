import React from 'react';
import { useState } from 'react';
import Axios from 'axios';

import './Login.scss';
import { SiCivicrm } from "react-icons/si";

const Login = ({ LogIn }) => {

  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  const login = () => {
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);

      if (response.data.auth) {
        LogIn(response.data.auth);
        localStorage.setItem("access-token", response.data.token);
        localStorage.setItem("refresh-token", response.data.refreshToken);
      } else {
        setMessage(response.data.message);
      }
      
    });
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="heading">
          <h2>Login Your Account</h2>
          <h1>test</h1>
        </div>

        <div className="input-wrapper">
          <label>Username</label>
          <input onChange={(e) => setUsername(e.target.value)}></input>
        </div>

        <div className="input-wrapper">
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>

        <p className='login-message'>{message}</p>

        <button className="login-btn" onClick={login}>Log In</button>

      </div>
    </div>
  );
}

export default Login;
