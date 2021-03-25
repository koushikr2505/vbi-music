import React, { useState } from 'react'
import { TrashFill, PlusSquareFill } from 'react-bootstrap-icons'

import './Song.css'

export default function Song(props) {
    
    const [addedState, setAddedState] = useState(props.isAdded > -1 && props.isAdded !== '' ? 'added' : 'removed');

    const handleAddSong = (page) => {

        if (page === 'createplaylist') {
            
            setAddedState('added');
            let song = props.song;
            song.createdat = new Date().toISOString(); 
            props.addedSongs.push(song);
            props.addToPlaylist(props.addedSongs);
            
        } else if (page === 'editplaylist' || page==='addmore') {
           
            let updatedSongs = props.previouslyadded;
            let song = props.song;
            song.createdat = new Date().toISOString();
            updatedSongs = updatedSongs.concat(song);
            props.addToPlaylist(updatedSongs);
            props.addOnEdit(updatedSongs);
            props.refreshExisting(updatedSongs);
            setAddedState('added');
        }

    }
    const removeSong = (page) => {
        if (page === 'createplaylist' ) {
            let updatedSongs = props.addedSongs;
            let indexToRemove = props.addedSongs.findIndex((item) => { return item.createdat === props.song.createdat });
            updatedSongs.splice(indexToRemove,1);
            props.addToPlaylist(updatedSongs);
            setAddedState('removed');
        } else if (page === 'editplaylist' || page==='addmore') {
            console.dir(props.song.createdat);
            console.dir(props.previouslyadded);
            let indexToRemove = props.previouslyadded.findIndex((item) => { return item.createdat === props.song.createdat });
            console.dir(indexToRemove);
            let updatedSongs = [...props.previouslyadded];
            updatedSongs.splice(indexToRemove,1);
            props.addToPlaylist(updatedSongs);
            props.addOnEdit(updatedSongs);
            props.refreshExisting(updatedSongs);
            setAddedState('removed');
        }

    }

    return (
        <React.Fragment>
            {props.song && props.album && <div className="song-wrapper">
                <div className="album-image">
                    <img src="https://via.placeholder.com/150" alt="thumbnail" />
                </div>
                <div className="song-details">
                    <div className="title-wrap">
                        <div className="song-title">{props.song.title}</div>
                        <div className="artist-name">Artist name</div>
                        <div className="album-name">{props.album.title}</div>
                    </div>
                    <div className="song-duration">
                        5:42 
                    </div>
                    <div className="user-actions">
                       
                            {(props.page === "createplaylist" || props.page === "editplaylist" || props.page==='addmore') && <div className="new-actions">
                                {addedState !== 'added' && props.page !=="editplaylist" ? <PlusSquareFill onClick={() => handleAddSong(props.page)} className="add-icon" size={20}></PlusSquareFill> : <TrashFill onClick={() => removeSong(props.page)} className="delete-icon" size={20}></TrashFill>}</div>
                            }
                     
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}