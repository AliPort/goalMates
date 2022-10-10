import React from 'react';
import { Link } from "react-router-dom"


function Home(){
    return (
        <div className="Home">
            <h1>Welcome, Mate!</h1> 
            {/* user name will replace mate */}
            <Link to="upcoming-goals"> Upcoming Goals
            </Link>
            <Link to="sidebar"> Sidebar
            </Link>
            <Link to="newgoal">
                Create New Goal
            </Link>
        </div>
    )
}

export default Home