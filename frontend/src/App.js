import React from 'react'
import './App.css';
import { 
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';

// Pages
import Landing from './components/Pages/Landing';
import SignUp from './components/SignUp'
import LoggedInLanding from './components/Pages/LoggedInLanding';

const AppRoutes = () => {
    let routes = useRoutes([ 
        { path: '/', element: <Landing /> },
        // functionality notes: in an ideal world the landing and the LoggedInLanding would both be at this route depending on if you're logged in
        { path: '/loggedin', element: <LoggedInLanding/> },
        { path: '/signup', element: <SignUp/> },
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
