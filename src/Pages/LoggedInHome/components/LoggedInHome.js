import React from 'react';

function LoggedInHome(){
    return (
        <div className="HomePage">
            <div className="navbar">
            </div>
            <div className="Welcome">
                <h1>Welcome, Mate!</h1> {/* user name will replace Mate once we have data */}
            </div>
            <div className="Upcoming">
                <h2>UPCOMING STARRED GOALS</h2>
                <div>STARRED GOALS GALLERY PLACEHOLDER DIV</div>
                
            </div>
        </div>
    )
}

export default LoggedInHome;