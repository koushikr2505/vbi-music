import React , {useState,useEffect} from 'react';
import './Songs.css'
import {nanoid} from 'nanoid'
import Song from '../Song'


export default function Songs(props) {
    let isAddedSong;   
  
    const [addedOnEdit,setOnEdit] = useState(props.previouslyadded && props.previouslyadded);
    
  
    
    const isAlreadyAdded = (page,song) => {
         if(page==='createplaylist'){
            
            let index = props.addedSongs.findIndex(songitem => {return songitem.id === song.id });
            if(index !== -1){
                isAddedSong = index;
            }else{
                isAddedSong = -1;
            }
         }else if(page==='editplaylist'){
            isAddedSong = addedOnEdit && addedOnEdit.length>0 && addedOnEdit.findIndex(alreadyadded => {return alreadyadded.id === song.id});
         }else if(page==='addmore'){
            isAddedSong = -1;
         }
         return isAddedSong;
    }
     
    // addedAlready = {props.addedSongs && props.addedSongs.findIndex(song => {return song.id === props.song.id})}
    return (
        <div>
            {props.Songs.length>0 && props.albums.length>0 && 
            props.Songs.map((song) => {
                return <Song song={song} isAdded={isAlreadyAdded(props.page,song)}  addedSongs = {props.page==='createplaylist'? props.addedSongs : props.page==='editplaylist'? props.previouslyadded: props.addedSongs} addOnEdit = {setOnEdit}   refreshExisting = {props.refreshExisting}  previouslyadded = {props.previouslyadded} addToPlaylist={props.addToPlaylist} key={"song-" + nanoid()} album={props.albums.find(album => {return album.id === song.albumId})} page={props.page}  ></Song>
            })            
            }            
        </div>
    )
}