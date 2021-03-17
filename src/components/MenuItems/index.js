import React from 'react'
import { NavLink } from 'react-router-dom'
import './MenuItems.css'
import { MusicNoteBeamed, MusicNoteList , PlusSquareFill } from 'react-bootstrap-icons'
import Divider from '../Divider'
import Playlists from '../Playlists'
export default function MenuItems() {
    return (
        <div className="menu-wrapper">
            <ul className="menu-links">
                <li>
                    <NavLink exact activeClassName="active" to="/">
                        <span className="icon"> <MusicNoteBeamed size={18}></MusicNoteBeamed> </span> <span>All songs</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="newplaylist">
                        <span className="icon"> <PlusSquareFill size={18}></PlusSquareFill> </span> <span>Create Playlist</span>
                    </NavLink>
                </li>
            </ul>
            <div className="title-wrapper">
                <span className="icon"> <MusicNoteList size={18}></MusicNoteList> </span> <span>Playlists</span>
            </div>
            <Divider></Divider>
            <Playlists></Playlists>
        </div>
    )
}

