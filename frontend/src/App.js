import React from 'react'
import './App.css';
import SearchBar from './components/Searchbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import GoalsView from './components/GoalsView';
import MatesView from './components/MatesView';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="App">
    <React.Fragment>
   
    
      <Navbar />
      <Router>
      <Routes>
        
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Mates" element={<MatesView />} />
        <Route path="/Goals" element={<GoalsView />} />
        <Route path="/SearchBar" element={<SearchBar />} />
        <Route path="/MatesView" element={<MatesView />} />
        <Route path="/" element={<Home/>} />
      </Routes>

     
    </Router>
    </React.Fragment>
    </div>
  );
}

export default App;