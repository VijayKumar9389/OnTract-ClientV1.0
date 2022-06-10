import { Route, Router, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
      headers: {
        "x-access-refresh-token": localStorage.getItem("x-access-refresh-token"),
      },
    }).then((response) => {
      console.log(response);
      if (response.data.auth) {
        console.log(response.data)
        localStorage.setItem("x-access-token", response.data.token);
        LogIn(response.data.auth);
      }
    });
  }, [loggedIn]);

  function LogIn(Auth) {
    setLoggedIn(Auth);
  }

  function Logout() {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`);
    window.localStorage.removeItem("x-access-refresh-token");
    window.localStorage.removeItem("x-access-token");
    setLoggedIn(false);
  }

  if (!loggedIn)
    return <Login LogIn={obj => LogIn(obj)} />

  return (
    <div className='app-container'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home Logout={Logout} />} />
        <Route path='/:name' element={<Profile Logout={Logout} />} />
      </Routes>
    </div>
  );
}

export default App;
