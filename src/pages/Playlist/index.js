import React from 'react'
import Songs from '../../components/Songs'

export default function Playlist() {
    return (
        <form>
            <input type="text" className="playlist-title" placeholder="Playlist Title"></input>
            <Songs page="createplaylist"></Songs>
            <button className="primary-btn" type="submit">Save Playlist</button>
        </form>
    )
}