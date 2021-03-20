import React from 'react'
import './PlayList.css'
import { Link } from 'react-router-dom'
export default function Playlists() {
    return (
        <div className="playlist-items">
            <ol>
                <li>
                    <Link to="/playlist">Playlist 1</Link>
                </li>
                <li>
                    <Link to="/playlist">Playlist 2</Link>
                </li>
                <li>
                    <Link to="/playlist">Playlist 3</Link>
                </li>
                <li>
                    <Link to="/playlist">Playlist 4</Link>
                </li>
            </ol>
        </div>
    )
}