import React from 'react'
import './App.css';

//components
import SearchBar from './components/Searchbar';
import GoalsView from './components/GoalsView';
import CalendarView from './components/CalendarView';
import MatesView from './components/MatesView';
import NewGoal from './components/NewGoal';
import LogIn from './components/LogIn';
import Footer from './components/Footer';

//pages
import Home from './components/Pages/Home';
import SignUpPage from './components/Pages/SignUpPage';

// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
    <h1>NavBar Placeholder</h1>
    <h1>LOGO PLACEHOLDER</h1>
    <SearchBar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LogIn />} />
        <Route path="/Mates" element={<MatesView />} />
        <Route path="/Calendar" element={<CalendarView />} />
        <Route path="/Goals" element={<GoalsView />} />
        <Route path="/newgoal" element={<NewGoal/>} />
      </Routes>
    </Router>
    <Footer/>
    </div> 
  );
}

export default App;

// help source: https://stackoverflow.com/questions/65425884/react-router-v6-error-useroutes-may-be-used-only-in-the-context-of-a-route
