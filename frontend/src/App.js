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
//line 21 is our main issue right now 10/8/21
// import goalMates_Server from '..../backend/server' 

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';

function App() {
  let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Goals!')
	let [data, setData] = useState([])

	// const server = goalMates_Server

	useEffect(() => {
		if(search) {
			const fetchData = async () => {
				document.title = `${search} Goal`
				const response = await fetch(goalMates_Server + search)
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
      </Routes>
      <Footer/>
    </Router>
    </div> 
  );
}

export default App;