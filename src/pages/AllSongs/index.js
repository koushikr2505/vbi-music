import React from 'react'

import Songs from '../../components/Songs'
import SearchBar from '../../components/Search'

export default function AllSongs(){
    return(
        <div>
            <h1>All Songs</h1>
            <SearchBar></SearchBar>
            <Songs></Songs>
        </div>        
    )
}