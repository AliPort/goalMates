import React from "react";
import GoalsView from "./GoalsView";
import { Link } from "react-router-dom"

function GoalsPage () {
    return (
        <div className="GoalsPage">
            <h1>Find New Goals</h1>
            <p>here we will need to add filters and a searchbar that can look through the GoalsView</p>
            <GoalsView/>
            <Link to="newgoal">
                Create New Goal
            </Link>
        </div>
    )
};

export default GoalsPage;