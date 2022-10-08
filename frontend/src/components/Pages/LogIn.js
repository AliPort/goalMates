import React from 'react';
import { Link } from "react-router-dom"

function LogIn(){
    return (
        <div className="LogInPage">
            <h1>LOG IN PLACEHOLDER</h1>
            <h2>New to goalMates?</h2>
            <Link to="signUp">
                SIGN UP TODAY
            </Link>
        </div>
    )
}

export default LogIn