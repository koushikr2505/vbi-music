import React , {useState} from 'react'
import './ToggleMenu.css'

export default function ToggleMenu(props){

    return(
        <div>
            <div className="hamburger-container">
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