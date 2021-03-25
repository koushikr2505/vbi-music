import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Divider from '../../components/Divider';
import Songs from '../../components/Songs'
import './Playlist.css'

export default function Playlist(props) {
    let { playlistid } = useParams();
    const [playlistTitle, setPlaylistTitle] = useState();

    const [playlistSongs, setPlaylistsongs] = useState([]);
    useEffect(() => {
        let lists = window.localStorage.getItem('playlists') ? JSON.parse(window.localStorage.getItem('playlists')) : props.playlists;
        let playlist = lists.length > 0 ? lists[playlistid - 1] : null;
        // setPlaylistTitle(playlist.title);
        playlist.songs = playlist.songs.sort(function(a, b) {
            return new Date(b.createdat) - new Date(a.createdat);
        });
        setPlaylistsongs(playlist.songs);
    }, [playlistid])

    const shuffleIt = () => {

        let songs = [...playlistSongs];
        for (let i = songs.length - 1; i > 0; i--) {

            // Generate random number 
            let j = Math.floor(Math.random() * i);

            let temp = songs[i];
            songs[i] = songs[j];
            songs[j] = temp;
        }
        setPlaylistsongs(songs);
    }

    return (
        <React.Fragment>
            {playlistSongs && playlistSongs.length > 0 ? <div>
                <h1>{playlistTitle&&playlistTitle}</h1> 
                <Divider></Divider>
                <div className="edit-shuffle">
                    <Link className="edit-button" to={`/edit/${playlistid}`}>Edit Playlist</Link>
                    <button className="primary-btn save-btn" onClick={shuffleIt}>Shuffle</button>
                </div>
                
               { playlistSongs.length>0 && <Songs albums={props.albums} Songs={playlistSongs} page="playlist"></Songs> }
            </div> : <div>No songs</div>}
        </React.Fragment>
    )
}