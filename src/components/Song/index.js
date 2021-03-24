import React, { useState, useEffect } from 'react'
import { TrashFill, PlusSquareFill } from 'react-bootstrap-icons'
import './Song.css'

export default function Song(props) {
    const [addedState, setAddedState] = useState();
    useEffect(() => {
        console.dir("prop:" + props.isAdded);
        setAddedState(props.isAdded > -1 && props.isAdded !== '' ? 'added' : 'removed')
    }, [])
    const handleAddSong = (page) => {

        if (page === 'createplaylist') {
            let updatedSongs = props.addedSongs.concat(props.song);
            props.addToPlaylist(updatedSongs);
            setAddedState('added');
            console.log(props.isAdded);
        } else if (page === 'editplaylist') {
            props.previouslyadded.push(props.song);
            props.addToPlaylist(props.previouslyadded);
            props.addOnEdit(props.previouslyadded);

            setAddedState('added');
        }

    }
    const removeSong = (page) => {
        if (page === 'createplaylist') {
            let updatedSongs = props.addedSongs;
            updatedSongs = updatedSongs.filter((song) => { return song.id !== props.song.id });
            console.log('aftr del');
            console.log(updatedSongs);
            props.addToPlaylist(updatedSongs);
            setAddedState('removed');
        } else if (page === 'editplaylist') {
            console.dir('remove');
            console.dir(props.previouslyadded);
            console.dir(props.song.id);
            let updatedSongs = props.previouslyadded.filter((item) => { return item.id !== props.song.id });
            console.dir(props.previouslyadded);
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
                        {/* <div> */}
                            {(props.page === "createplaylist" || props.page === "editplaylist") && <div className="new-actions">
                                {addedState !== 'added' ? <PlusSquareFill onClick={() => handleAddSong(props.page)} className="add-icon" size={20}></PlusSquareFill> : <TrashFill onClick={() => removeSong(props.page)} className="delete-icon" size={20}></TrashFill>}</div>
                            }
                        {/* </div> */}
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}