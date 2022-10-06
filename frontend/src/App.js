import React from 'react'
import './App.css';

//components
import SearchBar from './components/Searchbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
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
    <React.Fragment>
   
    
      <Navbar />
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LogIn />} />
        <Route path="/Mates" element={<MatesView />} />
        <Route path="/Goals" element={<GoalsView />} />
        <Route path="/SearchBar" element={<SearchBar />} />
        <Route path="/MatesView" element={<MatesView />} />
        
        <Route path="Footer" element={<Footer />} />
      </Routes>
    </Router>
    <Footer/>
    </div> 
  );
}

export default App;