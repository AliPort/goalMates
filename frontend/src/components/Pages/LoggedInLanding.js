import React from 'react';
import SignUp from '../SignUp';
import UpcomingGoals from '../UpcomingGoals';
import { Link } from "react-router-dom"
import SideBar from '../SideBar/Sidebar';

function LoggedInLanding(){
    return (
        <div className="LoggedInLanding">
            <h1>NavBar Placeholder</h1>
            <h1>LOGO PLACEHOLDER</h1>
            <h1>Welcome, Mate!</h1> 
            {/* user name will replace mate */}
            <UpcomingGoals/>
            <SideBar/>
            <h1>Footer Placeholder</h1>
        </div>
    )
}

export default LoggedInLanding