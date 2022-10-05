import React from 'react';
import WhyGoalMates from '../WhyGoalMates';
import { Link } from "react-router-dom"

function SignUpPage(){
    return (
        <div className="SignUpPage">
            <Link to="signup">
                SIGN UP TODAY
            </Link>
            <WhyGoalMates/>
            <h1>Achieve your goals!</h1> 
            <h1>Find Success!</h1>
            <Link to="signup">
                SIGN UP TODAY
            </Link>
        </div>
    )
}

export default SignUpPage