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
    const [playlistTitle,setPlaylistTitle] = useState();
    const [addedSongs, addSongToPlaylist] = useState([]);
    const [playlist,setPlaylist] = useState([]);
    const [existingSongs, setExistingSongs] = useState([]);
    
    useEffect(()=>{
        let lists = window.localStorage.getItem('playlists') ? JSON.parse(window.localStorage.getItem('playlists')) : props.playlists;
        let playlist = lists.length > 0 ? lists[playlistid - 1] : null;
        console.log(playlist);
        setPlaylist(playlist);
        setExistingSongs(playlist.songs);
        setPlaylistTitle(playlist.title);
    },[])
    

    const savePlaylist = (e) => {
        e.preventDefault();
        console.log('before save');
        console.dir(existingSongs);
        console.log(addedSongs);
        let updatedSongs = existingSongs.concat(addedSongs);
        addSongToPlaylist(existingSongs => [...existingSongs,existingSongs.concat(addedSongs)] );
        addSongToPlaylist(updatedSongs);
        console.log('--after save');
        console.log(updatedSongs);
       
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
        } else {
           
        }

    }
    return (
        <div>


            <h1>Edit playlist</h1>
            {/* <SearchBar Songs={props.songs} filtered={setSongList} isDefaultSearch={setDefault} page="createplaylist"></SearchBar> */}
            
            <Divider></Divider>

            <div className="playlist-form">
               
                <form>
                    <input type="text" value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} className="playlist-title" placeholder="Playlist Title"></input> <button onClick={savePlaylist} className="primary-btn save-btn" type="submit">Save Playlist</button>
                    <h3>Already added songs</h3>
                    <Divider></Divider>
                    { existingSongs ? <Songs albums={props.albums} Songs={existingSongs} addedSongs={existingSongs} previouslyadded={existingSongs} refreshExisting = {setExistingSongs} addToPlaylist={addSongToPlaylist} playlistid={playlistid} page="editplaylist"></Songs> : <div>No Songs</div>}
                    <Divider></Divider>

                    <SearchBar show={true} Songs={props.songs} filtered={setSongList} page="createplaylist"></SearchBar>
                    {songList.length > 0  ? <Songs albums={props.albums} Songs={songList} addedSongs = {addedSongs} addToPlaylist={addSongToPlaylist} previouslyadded={[]} page="createplaylist"></Songs> : <div>No Songs</div>}
                </form>
            </div>

            {/* <div className="added-songs-wrapper">
                <button className="remove-default-btn-styles added-songs" onClick={onOpenModal}>View Added Songs</button>
                <Modal open={open} onClose={onCloseModal} center>
                    <AddedSongs></AddedSongs>
                </Modal>
            </div> */}
        </div>
    )
}
