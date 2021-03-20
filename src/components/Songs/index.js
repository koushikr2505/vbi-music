import React from 'react';
import './Songs.css'
import Song from '../Song'


export default function Songs(props) {

    return (
        <div>
            {props.Songs.length>0 && props.albums.length>0 && 
            props.Songs.map((song,index) => {
                return <Song song={song} key={song.id} album={props.albums[index]} page={props.page} ></Song>
            })            
            }            
        </div>
    )
}