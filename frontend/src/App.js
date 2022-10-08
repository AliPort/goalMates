import React from 'react'
import './App.css';

//components


// import CalendarView from './components/CalendarView';

import LogIn from './components/Pages/LogIn';
import Footer from './components/Footer';

//pages
import Home from './components/Pages/Home';
import SignUpPage from './components/Pages/SignUpPage';
import Profile from './components/Pages/Profile';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import GoalsPage from './components/Pages/GoalsPage';
import YourMates from './components/Pages/YourMates';

// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Register from './components/Pages/Register';

function App() {

  return (
    <div className="App">
    <Router>
    <Navbar/>
      <Routes>
     
        <Route path="/" element={<Home/>} />
        {/* <Route path="/newuser" element={<SignUpPage/>}/> */}
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Mates" element={<YourMates/>} />
        {/* <Route path="/Calendar" element={<CalendarView />} />  */}
        <Route path="/Goals" element={<GoalsPage />} /> 
        {/* <Route path="/newgoal" element={<NewGoal/>}  */}
        <Route path='/profile' element={<Profile/>} /> 
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/signup' element={<SignUpPage/>}/> 
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </Router>
    </div> 
  );
}

export default App;