import React , {useState} from 'react'

import Songs from '../../components/Songs'
import SearchBar from '../../components/Search'

export default function AllSongs(props){
    const[songList,setSongList] = useState(props.songs);
    return(
        <div>
            <h1>All Songs</h1>
            <SearchBar Songs={props.songs} filtered={setSongList} page="allsongs"></SearchBar>
            {songList.length>0?<Songs albums={props.albums} Songs={songList} page="allSongs"></Songs>:<div>No Songs</div>}
        </div>        
    )
}