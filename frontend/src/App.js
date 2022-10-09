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
<<<<<<< HEAD
// import Contact from './components/Pages/Contact';
// import GoalsPage from './components/Pages/GoalsPage';
import YourMates from './components/Pages/YourMates';
// import Goal from './components/Pages/Goal';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import { HamburgerMenu } from './components/hamburgerMenu';
import Register from './components/Pages/Register';
=======

// import { useState } from 'react';
import { BrowserRouter as Router,  Route , Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu';

>>>>>>> d8b57a0359e48ae6bebc5b9f26e45618e87ffbd2

function App() {


  return (
    <div className="App">
<<<<<<< HEAD
    <Router>
    <Navbar/>
    <HamburgerMenu/>
    <Routes>
      
          <Route path="/" element = {<Home/>} />  
          <Route path="/about/" element= {<About/>} /> 
          <Route path="/LogIn" element={<LogIn />} /> 
          {/* <Route path="/WeatherMain" element={<WeatherMain/>} />  */}
          <Route path='/signup' element={<SignUpPage/>}/>  
          {<Route path='/register' element={<Register/>}/>}
=======
>>>>>>> d8b57a0359e48ae6bebc5b9f26e45618e87ffbd2

      <Router>
      <Navbar />
          <HamburgerMenu />
        
          <Routes>

<<<<<<< HEAD
   
     
     
        
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
=======
          <Route path="/" element={<Home />} />
          <Route path="/about/" element={<About />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/LogIn" element={<LogIn />} />

          <Route path='/signup' element={<SignUpPage />} />

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
>>>>>>> d8b57a0359e48ae6bebc5b9f26e45618e87ffbd2
  );
}

export default App;