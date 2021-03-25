import React from 'react'
import './AppDrawer.css'
import Logo from '../Logo'
import MenuItems from '../MenuItems'
import Playlists from '../Playlists'
export default function AppDrawer(props) {

    return (        
            <div className="app-menu">
                <Logo></Logo>
                <div className="menu-wrapper">
                <MenuItems></MenuItems>
                <Playlists playlists={props.updatedplaylists}></Playlists>
                </div>
            </div>
    )
}