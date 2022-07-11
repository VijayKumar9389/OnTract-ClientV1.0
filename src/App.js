import { useState, useEffect } from 'react';
import { Route, Routes, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
      headers: {
        "refresh-token": localStorage.getItem("refresh-token"),
      },
    }).then((response) => {
      if (response.data.auth) {
        localStorage.setItem("access-token", response.data.token);
        setLoggedIn(response.data.auth)
      } else {
        Logout();
      }
    });
  }, [loggedIn]);

  function LogIn(Auth) {
    setLoggedIn(Auth);
  }

  function Logout() {
    window.localStorage.removeItem("refresh-token");
    window.localStorage.removeItem("access-token");
    setLoggedIn(false);
  }

  if (!loggedIn) return <Login LogIn={obj => LogIn(obj)} />

  return (
    <div className='app-container'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home LogOut={Logout} />} />
        <Route path='/:name' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
