import { useState, useEffect } from 'react';
import { Route, Routes, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Analytics from './Pages/Analytics/Analytics';
import Records from './Pages/Records/Records';
import Reports from './Pages/Report/Report';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Survey from './Components/Survey/Survey';
import ProjectTable from './Components/Table/ProjectTable/ProjectTable';
import Project from './Pages/Project/Project';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

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
  }, [loggedIn, Cookies.get('project')]);

  function LogIn(Auth) {
    setLoggedIn(Auth);
  }

  function Logout() {
    window.localStorage.removeItem("refresh-token");
    window.localStorage.removeItem("access-token");
    setLoggedIn(false);
  }

  if (!loggedIn) return <Login LogIn={obj => LogIn(obj)} />

  if (!Cookies.get('project')) return (
    <Project logout={Logout} />
  )

  else return (
    <div className='app-container'>
      <ToastContainer />
      <ProjectTable isOpen={isOpen} toggle={toggle} />
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <Routes>
        <Route path='/' element={<Home LogOut={Logout} toggle={toggle} />} />
        <Route path='/:name' element={<Profile />} />
      </Routes>

    </div>
  );
}

export default App;
