import React from 'react';
import { Link } from "react-router-dom"
import './Signup.css';

function SignUpPage(){
    return (
        <div className="SignUpPage">
            <Link to="register">
                SIGN UP TODAY
            </Link>
            <h1>Why Goal Mates?</h1>
            <p>body paragraph</p>
            <Link to="about">
                Learn More
            </Link>
            <h1>Achieve your goals!</h1> 
            <h1>Find Success!</h1>
            <Link to="register">
                SIGN UP TODAY
            </Link>
        </div>
    )
}

export default SignUpPage