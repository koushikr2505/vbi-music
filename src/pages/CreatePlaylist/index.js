import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import SearchBar from '../../components/Search'
import './CreatePlaylist.css'
import Songs from '../../components/Songs'
import Divider from '../../components/Divider'


export default function CreatePlaylist(props) {
    const history = useHistory();
    const [songList, setSongList] = useState('');
    const [playlistTitle,setPlaylistTitle] = useState('');
    const [addedSongs,addSongToPlaylist] = useState([]);
    
    const savePlaylist = (e) => {
        e.preventDefault();
     
        let createdPlaylist = {            
                'title': playlistTitle,
                'songs': addedSongs,
                'createdat': new Date().toISOString()            
        };
        
        if(window.localStorage.getItem('playlists')){
            let existingPlaylists = JSON.parse(window.localStorage.getItem('playlists'));
            existingPlaylists = existingPlaylists.concat(createdPlaylist);
            existingPlaylists = existingPlaylists.sort(function(a, b) {
                return new Date(b.createdat) - new Date(a.createdat);
            });

            props.refresh(existingPlaylists);
            window.localStorage.setItem('playlists',JSON.stringify(existingPlaylists)); 
        }else{
            props.refresh(createdPlaylist);
            window.localStorage.setItem('playlists',JSON.stringify([createdPlaylist])); 
           
        }

        history.push("/playlist/1");
        
    }
    return (
        <div>


            <h1>Create playlist</h1>
            <SearchBar show={true} Songs={props.songs} filtered={setSongList}  page="createplaylist"></SearchBar>
            <Divider></Divider>

            <div className="playlist-form">
                {/* <form> */}
                    {playlistTitle ==='' && <div className="error-msg">Enter playlist title to save</div>}
                    <input type="text" defaultValue={playlistTitle} onChange = {(e)=>setPlaylistTitle(e.target.value)} className="playlist-title" placeholder="Playlist Title"></input> <button disabled={playlistTitle === '' ? true : false}  onClick={savePlaylist}  className="primary-btn save-btn" type="submit">Save Playlist</button>
                    {songList.length > 0  ? <Songs albums={props.albums} Songs={songList} addedSongs = {addedSongs} addToPlaylist={addSongToPlaylist} previouslyadded={[]} page="createplaylist"></Songs> : <div>No Songs</div>}
                {/* </form> */}
            </div>
        </div>
    )
}
