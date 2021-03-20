import React from 'react'
import { TrashFill , PlusSquareFill} from 'react-bootstrap-icons'
import './Song.css'

export default function Song(props){
    
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
                            {props.page==="createplaylist"?<TrashFill className="delete-icon" size={20}></TrashFill>:<PlusSquareFill className="add-icon" size={20}></PlusSquareFill>}
                        </div>                        
                    </div>
                </div>
            </div>}
            </React.Fragment>
    )
}