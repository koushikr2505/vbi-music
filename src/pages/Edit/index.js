import React, { useState , useEffect } from 'react'
import { useParams } from "react-router-dom";
import SearchBar from '../../components/Search'
import Songs from '../../components/Songs'
// import AddedSongs from '../../components/AddedSongs'
import Divider from '../../components/Divider'
// import { Modal } from 'react-responsive-modal';

export default function Edit(props) {
    console.dir('-------edit------');
    console.dir(props);
    console.dir('-------edit------');
    let { playlistid } = useParams();
    const [songList, setSongList] = useState('');
    const [playlistTitle,setPlaylistTitle] = useState('');
    const [addedSongs, addSongToPlaylist] = useState([]);
    const [playlist,setPlaylist] = useState([]);
    const [existingSongs, setExistingSongs] = useState([]);
    
    useEffect(()=>{
        let lists = window.localStorage.getItem('playlists') ? JSON.parse(window.localStorage.getItem('playlists')) : props.playlists;
        let playlist = lists.length > 0 ? lists[playlistid - 1] : null;
        
        setPlaylist(playlist);
        setExistingSongs(playlist.songs);
        setPlaylistTitle(playlist.title);
    },[])
    

    const savePlaylist = (e) => {
        e.preventDefault();
        let updatedSongs = existingSongs.concat(addedSongs);
        addSongToPlaylist(existingSongs => [...existingSongs,existingSongs.concat(addedSongs)] );
        addSongToPlaylist(updatedSongs);
       
        let createdPlaylist = {
            'title': playlistTitle,
            'songs': addedSongs,
        };

        if (window.localStorage.getItem('playlists')) {
            let existingPlaylists = JSON.parse(window.localStorage.getItem('playlists'));
            createdPlaylist.createdat = existingPlaylists[playlistid-1].createdat;
            existingPlaylists[playlistid - 1] = createdPlaylist;
            props.refresh(existingPlaylists);
            window.localStorage.setItem('playlists', JSON.stringify(existingPlaylists));
        } 

    }
    return (
        <div>


            <h1>Edit playlist</h1>
           
            
            <Divider></Divider>

            <div className="playlist-form">
               
                <form>
                    <input type="text" defaultValue={playlistTitle} onBlur={(e) => setPlaylistTitle(e.target.value)} className="playlist-title" placeholder="Playlist Title"></input> <button onClick={savePlaylist} className="primary-btn save-btn" type="submit">Save Playlist</button>
                    <h3>Already added songs</h3>
                    <Divider></Divider>
                    { existingSongs ? <Songs albums={props.albums} Songs={existingSongs} addedSongs={existingSongs} previouslyadded={existingSongs} refreshExisting = {setExistingSongs} addToPlaylist={addSongToPlaylist} playlistid={playlistid} page="editplaylist"></Songs> : <div>No Songs</div>}
                    <Divider></Divider>

                    <SearchBar show={true} Songs={props.songs} filtered={setSongList} page="createplaylist"></SearchBar>
                    {songList.length > 0  ? <Songs albums={props.albums} Songs={songList} addedSongs = {existingSongs} addToPlaylist={addSongToPlaylist} refreshExisting = {setExistingSongs} previouslyadded={existingSongs} page="addmore"></Songs> : <div>No Songs</div>}
                </form>
            </div>
        </div>
    )
}
