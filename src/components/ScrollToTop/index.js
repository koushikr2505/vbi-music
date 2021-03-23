import React from 'react'
import { ArrowUpCircleFill } from 'react-bootstrap-icons'
import './scrolltotop.css'

export default function ScrollToTop(){
    return(
            <div className="scrolltop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div>Scroll to top</div> <ArrowUpCircleFill size={25} color={'#10B981'}></ArrowUpCircleFill>
            </div>
    )
}
