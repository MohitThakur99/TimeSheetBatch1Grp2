import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Timesheet from './components/Timesheet';
import Manager from './components/Manager';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LeaveApplication from "./components/LeaveApplication/LeaveApplication";
import HolidayCanlender from './components/HolidayCanlender';

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ManagerView">Manager</Link>
              </li>
              <li>
                <Link to="/leave-manager">Leave Application</Link>
              </li>
              <li>
                <Link to="/Canlender">Holiday Calendar</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Timesheet />} />
            <Route path="/ManagerView" element={<Manager />} />
            <Route path="/leave-manager" element={<LeaveApplication />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Canlender" element={<HolidayCanlender/>} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
