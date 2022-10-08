import React from 'react'
// import './App.css';

//components

import LogIn from './components/Pages/LogIn';
import Footer from './components/Footer/Footer';
import WeatherMain from './components/Weather/WeatherMain';

//pages
import Home from './components/Pages/Home';
import SignUpPage from './components/Pages/SignUpPage';
// import Profile from './components/Pages/Profile';
import About from './components/Pages/About';
// import Contact from './components/Pages/Contact';
// import GoalsPage from './components/Pages/GoalsPage';
// import YourMates from './components/Pages/YourMates';
// import Goal from './components/Pages/Goal';

// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import { HamburgerMenu } from './components/hamburgerMenu';

function App() {

  return (
    <div className="App">
    <Router>
    <Navbar/>
    <HamburgerMenu/>
    <Routes>
      
          <Route path="/" element = {<Home/>} />  
          <Route path="/about/" element= {<About/>} /> 
          <Route path="/LogIn" element={<LogIn />} /> 
          <Route path="/WeatherMain" element={<WeatherMain/>} /> 
          <Route path='/signup' element={<SignUpPage/>}/>  

   
   
   
   

   
     
     
        
        {/* <Route path="/newuser" element={<SignUpPage/>}/> */}
        
        {/* <Route path="/Mates" element={<YourMates/>} /> */}
        {/* <Route path="/Goal" element={<Goal />} /> */}
        {/* <Route path="/Goals" element={<GoalsPage />} />  */}
        
        {/* <Route path='/profile' element={<Profile/>} />  */}
        {/* <Route path='/about' element={<About/>}/> */}
        {/* <Route path='/contact' element={<Contact/>}/> */}
        
      </Routes>
      
    </Router>
    <Footer />
    </div> 
  );
}

export default App;