import React from 'react'
import './ToggleMenu.css'

export default function ToggleMenu(){
    return(
        <div>
            <div className="hamburger-container ml-auto mr-2.5 relative md:hidden order-2 md:order-3">
                    <input type="checkbox"/>
                    <div className="span-container">
                        <span className="block hamburger"></span>
                        <span className="block hamburger"></span>
                        <span className="block hamburger"></span>
                    </div>
                </div>
        </div>
    )
}