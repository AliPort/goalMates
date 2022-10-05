import React from 'react';
import SignUp from '../SignUp';
import WhyGoalMates from '../WhyGoalMates';
import { Link } from "react-router-dom"

function Landing(){
    return (
        <div className="Landing">
            <h1>NavBar Placeholder</h1>
            <h1>LOGO PLACEHOLDER</h1>
            <Link to="signup">
                SIGN UP TODAY
            </Link>
            <WhyGoalMates/>
            <h1>Achieve your goals!</h1> 
            <h1>Find Success!</h1>
            <Link to="signup">
                SIGN UP TODAY
            </Link>
            <h1>Footer Placeholder</h1>
        </div>
    )
}

export default Landing