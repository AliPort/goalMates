import React from 'react'
import './App.css';
import SearchBar from './components/Searchbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import GoalsView from './components/GoalsView';
import CalendarView from './components/CalendarView';
import MatesView from './components/MatesView';
// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Mates" element={<MatesView />} />
        <Route path="/Calendar" element={<CalendarView />} />
        <Route path="/Goals" element={<GoalsView />} />
      </Routes>
    </Router>

    <SearchBar/>
    <Home/>
    <SignUp/>
    <GoalsView />
    <MatesView/>
    
    </div>
  );
}

export default App;

// help source: https://stackoverflow.com/questions/65425884/react-router-v6-error-useroutes-may-be-used-only-in-the-context-of-a-route
