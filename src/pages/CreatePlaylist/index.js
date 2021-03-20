import React , {useState} from 'react'
import SearchBar from '../../components/Search'
import './CreatePlaylist.css'
import Songs from '../../components/Songs'
import Divider from '../../components/Divider'

export default function CreatePlaylist(props) {
    const[songList,setSongList] = useState(props.songs);
    return (        
        <div>
            <h1>Create playlist</h1>
            <SearchBar Songs={props.songs} filtered={setSongList} page="createplaylist"></SearchBar>
            <Divider></Divider>

            <div className="playlist-form">
                <form>
                    <input type="text" className="playlist-title" placeholder="Playlist Title"></input>
                    {songList.length>0?<Songs albums={props.albums} Songs={songList} page="createplaylist"></Songs>:<div>No Songs</div>}
                    <button className="primary-btn" type="submit">Save Playlist</button>
                </form>
            </div>
            
        </div>
    )
}
