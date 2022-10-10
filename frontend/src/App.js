import React from 'react'
import './App.css';

//components

import LogIn from './components/Pages/LogIn';
import Footer from './components/Footer/Footer';
import Weather from './Weather';


//pages
import Home from './components/Pages/Home';
import SignUpPage from './components/Pages/SignUpPage';
import About from './components/Pages/About';
import Register from './components/Pages/Register';

// import { useState } from 'react';
import { BrowserRouter as Router,  Route , Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu';


function App() {


  return (
    <div className="App">

      <Router>
      <Navbar />
          <HamburgerMenu />
        
          <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about/" element={<About />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/LogIn" element={<LogIn />} />

          <Route path='/signup' element={<SignUpPage />} />

          <Route path='/register' element={<Register />} />

          </Routes>








          {/* <Route path="/newuser" element={<SignUpPage/>}/> */}

          {/* <Route path="/Mates" element={<YourMates/>} /> */}
          {/* <Route path="/Goal" element={<Goal />} /> */}
          {/* <Route path="/Goals" element={<GoalsPage />} />  */}

          {/* <Route path='/profile' element={<Profile/>} />  */}
          {/* <Route path='/about' element={<About/>}/> */}
          {/* <Route path='/contact' element={<Contact/>}/> */}

         <Footer />

      </Router>
    
    </div>
  );
}

export default App;