import { useState } from 'react' 
import { Link } from 'react-router-dom'
// the below file needs to be moved to the public folder and then linked
// import GoalsImage from '../components/GoalsImage.png' image not working because i converted it from a different file type. we can use a different image as the background if needed.

function GoalItem(props){
    let [view, setView] = useState("First Goal")

    const simpleStyle = {
        'width': '25vw',
        'min-height': '20vh',
        'border': '.25em solid black',
        'margin': '.25em',
        // 'justify-content': 'center',
    }
    
    const detailStyle = {
        'display': 'flexbox',
        'width': '80vw',
        'min-height': '20vh',
        'padding': '.25em',
        'text-align': 'center',
        'border': '.25em solid grey',
        'margin': '1em',
        // 'backgroundImage': `url(${props.item.GoalsImage})`,
        'backgroundRepeat': 'no-repeat',
        'backgroundSize': 'cover',
        'color': 'white',
        'text-shadow':
         '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    }

    const simpleView = () => {
        return (
            <div style={simpleStyle}>
                <h3>{props.item.goalName}</h3>
                {/* <h4>{props.item.collectionName}</h4> */}
            </div>
        )
    }

    const detailView = () => {
        return (
            <div style={detailStyle}>
                <h3>{props.item.goalName}</h3>
                <h4>
                    <Link to={`/goal/${props.item.goal_id}`}>
                        {props.item.goalName}
                    </Link>
                </h4>
                {/* <h4>
                    <Link to={`/album/${props.item.collectionId}`}>
                        {props.item.collectionName}
                    </Link>
                </h4>
                <h5>{props.item.primaryGenreName}</h5>
                <h5>{props.item.releaseDate}</h5> */}
            </div>
        )
    }

    return (
        <div onClick={() =>setView(!view)} style={{'display': 'inline-flexbox', 'textAlign': 'center'}}>
            {/* This simple ternary shows the simple view when 'view' is false! */}
            {view ? detailView() : simpleView()}
        </div>
    )
}

export default GoalItem