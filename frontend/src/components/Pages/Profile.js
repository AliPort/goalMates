import React from "react";
import Chat from "../SideBar/Chat";
import GoalsView from "../GoalsView";

function Profile () {
    return (
        <div className="Profile">
            <h1>User's Name</h1>
            <h2>Location: data</h2>
            <h2>Joined: data</h2>
            <h2>Bio: data</h2>
            <h2>you are/are not mates</h2>
            <Chat/>
            <GoalsView/>
        </div>
    )
};

export default Profile;