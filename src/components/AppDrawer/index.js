import React from 'react'
import './AppDrawer.css'
import Logo from '../Logo'
import MenuItems from '../MenuItems'
export default function AppDrawer() {
    return (
        <div className="grid-item">
            <div className="app-menu">
                <Logo></Logo>
                <MenuItems></MenuItems>
            </div>
        </div>
    )
}