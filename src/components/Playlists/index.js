import React from 'react'
import './PlayList.css'
import { Link , useRouteMatch } from 'react-router-dom'

export default function Playlists(props) {
    let { url } = useRouteMatch();
    let lists = window.localStorage.getItem('playlists')?JSON.parse(window.localStorage.getItem('playlists')):props.playlists;    
    return (
        <div className="playlist-items">             
                { lists && lists.length>0 ? <ol>                     
                     {lists.map((playlist,index)=>{
                        return(<li key={index}><Link to={`/playlist/${index+1}`}>{playlist.title}</Link></li>)
                     })}
                     </ol>:<div>No playlist</div>                     
                }            
        </div>
    )
}