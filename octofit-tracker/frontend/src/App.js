import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function WelcomeDashboard() {
  const [stats, setStats] = useState({
    users: [],
    activities: [],
    teams: [],
    workouts: []
  });

  useEffect(() => {
    // Fetch summary data for the dashboard
    const baseUrl = 'https://super-duper-space-memory-4rqp6pwg6xh979-8000.app.github.dev/api';
    Promise.all([
      fetch(`${baseUrl}/users/`).then(res => res.json()),
      fetch(`${baseUrl}/activities/`).then(res => res.json()),
      fetch(`${baseUrl}/teams/`).then(res => res.json()),
      fetch(`${baseUrl}/workouts/`).then(res => res.json())
    ]).then(([users, activities, teams, workouts]) => {
      setStats({ users, activities, teams, workouts });
    }).catch(error => console.error('Error fetching dashboard data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Welcome to OctoFit Tracker</h1>
      <div className="row">
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">Total Users: {stats.users.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Activities</h5>
              <p className="card-text">Total Activities: {stats.activities.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Teams</h5>
              <p className="card-text">Total Teams: {stats.teams.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Workouts</h5>
              <p className="card-text">Available Workouts: {stats.workouts.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/" element={<WelcomeDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
