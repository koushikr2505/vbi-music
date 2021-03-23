import React, { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";
import SearchBar from '../../components/Search'
import Songs from '../../components/Songs'
// import AddedSongs from '../../components/AddedSongs'
import Divider from '../../components/Divider'
// import { Modal } from 'react-responsive-modal';

export default function Edit(props) {
    let { playlistid } = useParams();
    const [songList, setSongList] = useState('');
    const [firstLoad , setFirstLoad] = useState(true);
    
    // const [isDefault, setDefault] = useState(true);
    // const [open, setOpen] = useState(false);
    const [addedSongs, addSongToPlaylist] = useState([]);
    let lists = window.localStorage.getItem('playlists') ? JSON.parse(window.localStorage.getItem('playlists')) : props.playlists;
    let playlist = lists.length > 0 ? lists[playlistid - 1] : null;

    // addSongToPlaylist(playlist.songs);
    
    const [playlistTitle,setPlaylistTitle] = useState(playlist.title);
 
    

    // const onOpenModal = () => setOpen(true);
    // const onCloseModal = () => setOpen(false);

    const savePlaylist = (e) => {
        e.preventDefault();
        let createdPlaylist = {
            'title': playlistTitle,
            'songs': addedSongs,
            'createdat': new Date().toISOString()
        };

        if (window.localStorage.getItem('playlists')) {
            let existingPlaylists = JSON.parse(window.localStorage.getItem('playlists'));
            existingPlaylists = existingPlaylists.concat(createdPlaylist);
            props.refresh(existingPlaylists);
            window.localStorage.setItem('playlists', JSON.stringify(existingPlaylists));
        } else {
            props.refresh(createdPlaylist);
            window.localStorage.setItem('playlists', JSON.stringify([createdPlaylist]));
        }

    }
    return (
        <div>


            <h1>Create playlist</h1>
            {/* <SearchBar Songs={props.songs} filtered={setSongList} isDefaultSearch={setDefault} page="createplaylist"></SearchBar> */}
            <SearchBar show={true} Songs={props.songs} filtered={setSongList} page="createplaylist"></SearchBar>
            <Divider></Divider>

            <div className="playlist-form">
                <form>
                    <input type="text" value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} className="playlist-title" placeholder="Playlist Title"></input> <button onClick={savePlaylist} className="primary-btn save-btn" type="submit">Save Playlist</button>
                    {playlist ? <Songs albums={props.albums} Songs={songList.length>0?songList:playlist.songs} addedSongs={addedSongs} previouslyadded={playlist.songs} addToPlaylist={addSongToPlaylist} playlistid={playlistid} page="editplaylist"></Songs> : <div>No Songs</div>}
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
