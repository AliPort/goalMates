import React from 'react';
import {Link} from "react-router-dom"
import GoalItem from './GoalsItem';

function GoalsView(props){
    const display = props.data.map((item,index) => {
        return (
            <GoalItem item={item} key={index} />
        )
    })
    return (
        <section id="goalsview">
        <div>
            {display}
            <h1>This is the GoalsView component</h1>
            <h2>You can also create your own goals to find common goals</h2>
            <Link to="newgoal">
                Create New Goal
            </Link>
        </div>
        </section>
    )
}

export default GoalsView


// let [search, setSearch] = useState('')

// const handleSearch = (e, term) => {
//     e.preventDefault()
//     setSearch(term)
// }
// console.log({data})