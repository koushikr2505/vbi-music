import React , {useState} from 'react'
import {Link, useParams } from "react-router-dom";
import Songs from '../../components/Songs'

export default function Playlist(props) {
    let { playlistid } = useParams();
    let lists = window.localStorage.getItem('playlists') ? JSON.parse(window.localStorage.getItem('playlists')) : props.playlists;
    let playlist = lists.length > 0 ? lists[playlistid - 1] : null;
    const [playlistTitle,setPlaylistTitle] = useState(playlist.title);
    const handleSave = ()=>{
        //props.refresh();
        let indexToUpdate = lists.findIndex((list) => {return list.createdat === playlist.createdat});
        let updatedPlaylist = {            
            'title': playlistTitle,
            'songs': playlist.songs,
            'createdat': playlist.createdat         
        };
        lists[indexToUpdate] = updatedPlaylist;
        props.refresh(lists);
        window.localStorage.setItem('playlists',JSON.stringify(lists));
    }

    return (
        <React.Fragment>
            {playlist && playlist.songs.length > 0 ? <div><input type="text" readOnly value={playlistTitle} className="playlist-title" onChange = {(e)=> setPlaylistTitle(e.target.value)} placeholder="Playlist Title"></input> <Link to={`/edit/${playlistid}`}>Edit Playlist</Link>
                <Songs albums={props.albums} Songs={playlist.songs} page="editplaylist"></Songs>
                </div> : <div>No songs</div>}
        </React.Fragment>
    )
}