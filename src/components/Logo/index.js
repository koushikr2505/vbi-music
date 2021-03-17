import React from 'react'
import { DiscFill } from 'react-bootstrap-icons'
import './logo.css'

export default function Logo(){
    return (

        <div className="logo">
            <div className="logo-name">VBI <div className="sub-text">Music</div></div><span className="logo-icon"><DiscFill size={26}></DiscFill></span>
            
        </div>

    )
}