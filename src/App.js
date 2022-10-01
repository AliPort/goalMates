import React from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import WeatherNews from './components/Navbar/WeatherNews';
import SignUp from './components/Navbar/SingUp';



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/WeatherNews' component={WeatherNews} />
        <Route path='/Sign-up' component={SignUp} />
      </Routes>
    </Router>
    

    </div>
  );
}

export default App;