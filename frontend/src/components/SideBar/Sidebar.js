import React from "react";
// import Calendar from "./Calendar";
import Chat from "./Chat";
import YourGoals from "./YourGoals";
<<<<<<< HEAD
import MatesView from "./MatesView";
=======
import MatesView from "../Pages/MatesView";
>>>>>>> origin/development

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