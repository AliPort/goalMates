import React from "react";
// import Calendar from "./Calendar";
import Chat from "./Chat";
import YourGoals from "./YourGoals";
import MatesView from "../Pages/MatesView.js";

function SideBar(){
    return (
        <div className="SideBar">
            {/* <Calendar/> */}
            <YourGoals/>
            <MatesView/>
            <Chat/>
        </div>
    )
}

export default SideBar; 