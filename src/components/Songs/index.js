import React , {useState,useEffect} from 'react';
import './Songs.css'
import Song from '../Song'


export default function Songs(props) {
    let isAddedSong;   
  
    const [addedOnEdit,setOnEdit] = useState(props.previouslyadded && props.previouslyadded);
    
  
    
    const isAlreadyAdded = (page,song) => {
         if(page==='createplaylist'){
            isAddedSong = -1;
         }else if(page==='editplaylist'){
            isAddedSong = addedOnEdit && addedOnEdit.length>0 && addedOnEdit.findIndex(alreadyadded => {return alreadyadded.id === song.id});
         }
         return isAddedSong;
    }
     
    // addedAlready = {props.addedSongs && props.addedSongs.findIndex(song => {return song.id === props.song.id})}
    return (
        <div>
            {props.Songs.length>0 && props.albums.length>0 && 
            props.Songs.map((song,index) => {
                return <Song song={song} isAdded={isAlreadyAdded(props.page,song)}  addedSongs = {props.page==='createplaylist'? props.addedSongs : props.page==='editplaylist'? props.previouslyadded: props.addedSongs} addOnEdit = {setOnEdit}   refreshExisting = {props.refreshExisting}  previouslyadded = {props.previouslyadded} addToPlaylist={props.addToPlaylist} key={props.previouslyadded ? props.previouslyadded.length + index: "song-"+index} album={props.albums.find(album => {return album.id === song.albumId})} page={props.page}  ></Song>
            })            
            }            
        </div>
    )
}