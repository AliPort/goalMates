import React from 'react';
import { Link } from "react-router-dom"
import SideBar from '../SideBar/Sidebar';
import MatesView from '../MatesView';

function YourMates(){
    return (
        <div className="YourMates">
            <h1>Say hi to your mates!</h1> 
            {/* user name will replace mate */}
            <SideBar/>
            <MatesView/>
            <Link to="newgoal">
                Create New Goal
            </Link>
        </div>
    )
}

export default YourMates