import React from 'react'
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Goal from './components/Goal';

function App() {
  return (
    <div className="App">
      <Home/>
      <SignUp/>
    </div>
  );
}

export default App;
