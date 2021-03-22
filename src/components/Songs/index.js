import React , {useState} from 'react';
import './Songs.css'
import Song from '../Song'


export default function Songs(props) {
    
    return (
        <div>
            {props.Songs.length>0 && props.albums.length>0 && 
            props.Songs.map((song) => {
                return <Song song={song} addedSongs = {props.addedSongs} addToPlaylist={props.addToPlaylist} key={song.id} album={props.albums.find(album => {return album.id === song.albumId})} page={props.page}  ></Song>
            })            
            }            
        </div>
    )
}