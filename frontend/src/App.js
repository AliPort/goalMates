import React from 'react'
import './App.css';

//components
import SearchBar from './components/Searchbar';
// import CalendarView from './components/CalendarView';
import NewGoal from './components/NewGoal';
import LogIn from './components/LogIn';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

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
    <h1>NavBar Placeholder</h1>
    <h1>LOGO PLACEHOLDER</h1>
    <SearchBar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/newuser" element={<SignUpPage/>}/>
        <Route path="/login" element={<LogIn />} />
        <Route path="/Mates" element={<YourMates/>} />
        {/* <Route path="/Calendar" element={<CalendarView />} /> */}
        <Route path="/Goals" element={<GoalsPage />} />
        <Route path="/newgoal" element={<NewGoal/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </Router>
   
    </div> 
  );
}

export default App;

// help source: https://stackoverflow.com/questions/65425884/react-router-v6-error-useroutes-may-be-used-only-in-the-context-of-a-route
