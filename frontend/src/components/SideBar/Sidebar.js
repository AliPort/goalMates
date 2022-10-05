import React from "react";
import Calendar from "./Calendar";
import Chat from "./Chat";
import YourGoals from "./YourGoals";
import YourMates from "./YourMates";

function SideBar(){
    return (
        <div className="SideBar">
            <Calendar/>
            <YourGoals/>
            <YourMates/>
            <Chat/>
        </div>
    )
}

export default SideBar; 