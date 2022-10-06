import { useState } from 'react'

function SearchBar(props) {
    let [searchTerm, setSearchTerm] = useState('')

    return (
        <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>

            <input type="text" width="80vw" placeholder="find mates with similar goals here" onChange={
                (e) => setSearchTerm(e.target.value)
            } />

            <input type="submit" />
            <p><i>(The search bar needs to get added into the nav bar.)</i></p>

        </form>
    )
}

export default SearchBar