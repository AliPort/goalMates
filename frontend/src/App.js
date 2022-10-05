<<<<<<< HEAD
// import "./App.css";
import Routes from "./Routes/Routes";
=======
import React from 'react'
import './App.css';
import SearchBar from './components/Searchbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
<<<<<<< HEAD
import Goal from './components/Goal';
>>>>>>> development
=======
import GoalsView from './components/GoalsView';
import CalendarView from './components/CalendarView';
import MatesView from './components/MatesView';
// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
>>>>>>> 7d9cffba0bf6b4fd68ae960f2a89c96fce09013e

function App() {


  return (
    <div className="App">
<<<<<<< HEAD
<<<<<<< HEAD
       <Routes/>
=======
      <Home/>
      <SignUp/>
>>>>>>> development
=======
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
    
>>>>>>> 7d9cffba0bf6b4fd68ae960f2a89c96fce09013e
    </div>
  );
}

export default App;
