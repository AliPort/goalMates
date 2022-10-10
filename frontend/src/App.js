import React from 'react'
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// COMPONENTS

import LogIn from './components/Pages/LogIn';
import Footer from './components/Footer/Footer';
import Weather from './Weather';


// PAGES
import Home from './components/Pages/Home';
import SignUpPage from './components/Pages/SignUpPage';
import About from './components/Pages/About';

// import { useState } from 'react';
// import { BrowserRouter as Router,  Route , Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu';

import Contact from './components/Pages/Contact';
import GoalsPage from './components/Pages/GoalsPage';
import YourMates from './components/Pages/YourMates';
//line 21 is our main issue right now 10/8/21

// import Server from '.../backend/server.js';

function App() {
  let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Goals!')
	let [data, setData] = useState([])

	// const server = Server

	useEffect(() => {
		if(search) {
			const fetchData = async () => {
				document.title = `${search} Goal`
        // removed. add 'server +' back to 'search' if possible
				const response = await fetch(search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					return setData(resData.results)
				} else {
					return setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}
	console.log({data} +'goalMates server is linked!')


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