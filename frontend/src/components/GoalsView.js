import React from 'react';
import {Link} from "react-router-dom"

function GoalsView(){
    return (
        <div>
            <h1>This is the GoalsView component</h1>
            <h2>You can also create your own goals to find common goals</h2>
            <Link to="newgoal">
                Create New Goal
            </Link>
        </div>
    )
}

export default GoalsView


// let [search, setSearch] = useState('')

// const handleSearch = (e, term) => {
//     e.preventDefault()
//     setSearch(term)
// }
// console.log({data})