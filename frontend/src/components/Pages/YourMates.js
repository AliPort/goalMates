import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import SideBar from '../SideBar/Sidebar';
import MatesView from './MatesView';

function YourMates(props){
    const [user, setUser] = useState(null);

    async function fetchUserData(id) {
        const response = await fetch ("/" + id);
        setUser(await response.json());
    }

    useEffect(() => {
        fetchUserData(props.id);
    }, [props.id]);

    if (!user) {
        return "loading...";
    }

    

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
    );
}

export default YourMates