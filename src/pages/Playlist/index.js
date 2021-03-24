import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Divider from '../../components/Divider';
import Songs from '../../components/Songs'
import './Playlist.css'

export default function Playlist(props) {
    let { playlistid } = useParams();
    const [playlistTitle, setPlaylistTitle] = useState('');

    const [playlistSongs, setPlaylistsongs] = useState();
    useEffect(() => {
        let lists = window.localStorage.getItem('playlists') ? JSON.parse(window.localStorage.getItem('playlists')) : props.playlists;
        let playlist = lists.length > 0 ? lists[playlistid - 1] : null;
        setPlaylistTitle(playlist.title);
        setPlaylistsongs(playlist.songs);
    }, [])




    console.dir('-------individual------');
    console.dir(props);
    console.dir('-------individual------');
    // const handleSave = () => {
    //     //props.refresh();
    //     let indexToUpdate = lists.findIndex((list) => { return list.createdat === playlist.createdat });
    //     let updatedPlaylist = {
    //         'title': playlistTitle,
    //         'songs': playlist.songs,
    //         'createdat': playlist.createdat
    //     };
    //     lists[indexToUpdate] = updatedPlaylist;
    //     props.refresh(lists);
    //     window.localStorage.setItem('playlists', JSON.stringify(lists));
    // }
    const shuffleIt = () => {

        console.dir(playlistSongs);
        let songs = [...playlistSongs];
        for (let i = songs.length - 1; i > 0; i--) {

            // Generate random number 
            let j = Math.floor(Math.random() * (i + 1));

            let temp = songs[i];
            songs[i] = songs[j];
            songs[j] = temp;
        }
        setPlaylistsongs(songs);
        console.dir(playlistSongs);
    }

    return (
        <React.Fragment>
            {playlistSongs && playlistSongs.length > 0 ? <div>
                <h1>{playlistTitle}</h1>
                <Divider></Divider>
                <div className="edit-shuffle">
                    <Link className="edit-button" to={`/edit/${playlistid}`}>Edit Playlist</Link>
                    <button className="primary-btn save-btn" onClick={shuffleIt}>Shuffle</button>
                </div>

                {/* <input type="text" readOnly value={playlistTitle} className="playlist-title" onChange={(e) => setPlaylistTitle(e.target.value)} placeholder="Playlist Title"></input> */}
                <Songs albums={props.albums} Songs={playlistSongs} page="playlist"></Songs>
            </div> : <div>No songs</div>}
        </React.Fragment>
    )
}