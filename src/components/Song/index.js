import React , {useState,useEffect} from 'react'
import { TrashFill , PlusSquareFill} from 'react-bootstrap-icons'
import './Song.css'

export default function Song(props){
    const[addedState,setAddedState] = useState();
    const handleAddSong = (e) =>{
        props.addToPlaylist(props.addedSongs.concat(props.song));
        setAddedState('added');
    }
    const removeSong = () =>{
        
       let updatedSongs = props.addedSongs;
       updatedSongs.splice(updatedSongs.findIndex((song)=> {return song.id === props.song.id}),1);
       console.log(updatedSongs);
       setAddedState('removed');
    }
    
    return(
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
                        <div>
                            { props.page==="createplaylist"?<div className="new-actions">
                               {addedState!=='added'?<PlusSquareFill onClick={handleAddSong} className="add-icon" size={20}></PlusSquareFill>:<TrashFill onClick = {removeSong} className="delete-icon" size={20}></TrashFill>}</div>:
                                <PlusSquareFill className="add-icon" size={20}></PlusSquareFill>
                            }
                        </div>                        
                    </div>
                </div>
            </div>}
            </React.Fragment>
    )
}