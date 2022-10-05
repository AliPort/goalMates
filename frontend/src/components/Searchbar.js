import { useState } from 'react'

function SearchBar(props) {
    let [searchTerm, setSearchTerm] = useState('')

    return (
        <section>
        <div className="search-bar">
        <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>

            <input type="text" width="80vw" placeholder="find mates with similar goals here" onChange={
                (e) => setSearchTerm(e.target.value)
            } />

            <input type="submit" />
        

        </form>
        </div>
        </section>
    )
}

export default SearchBar