import React from 'react'
import './App.css';
import { 
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';

// Pages
import LoggedInHome from "./Pages/LoggedInHome/components/LoggedInHome.js"


const AppRoutes = () => {
    let routes = useRoutes([ 
        { path: '/', element: <LoggedInHome /> },
    ]);

    return routes;
};

const App = () => {
  return (
    <Router>
      <AppRoutes/>
    </Router>
  )
};

export default App;

// help source: https://stackoverflow.com/questions/65425884/react-router-v6-error-useroutes-may-be-used-only-in-the-context-of-a-route