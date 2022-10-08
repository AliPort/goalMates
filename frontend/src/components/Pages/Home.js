import React from 'react';
import { Link } from "react-router-dom"
import StarredGoals from './StarredGoals';
import UpcomingGoals from './UpcomingGoals';
import SideBar from '../SideBar/Sidebar';

function Home(){
    return (
        <div className="Home">
            <h1>Welcome, Mate!</h1> 
            {/* user name will replace mate */}
            <StarredGoals/>
            <SideBar/>
            <UpcomingGoals/>
            <Link to="newgoal">
                Create New Goal
            </Link>
        </div>
    )
}

export default Home