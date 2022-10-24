import { useState, useEffect } from 'react';
import { Route, Routes, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Analytics from './Pages/Analytics/Analytics';
import Records from './Pages/Records/Records';
import Reports from './Pages/Report/Report';
import Navbar from './Components/Navbar/Navbar';

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
        setLoggedIn(response.data.auth);
        console.log(response.data);
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
      <Navbar />
      <Routes>
        <Route path='/' element={<Home LogOut={Logout} />} />
        <Route path='/:name' element={<Profile />} />
        <Route path='/Records' element={<Records />} />
        <Route path='/Reports' element={ <Reports /> } />
        <Route path='/Analytics' element={ <Analytics /> } />
      </Routes>
    </div>
  );
}

export default App;
