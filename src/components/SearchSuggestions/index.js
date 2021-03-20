import React , {useState , useEffect} from 'react'
import './SearchSuggestions.css'

export default function SearchSuggestions(props){
    const[visibility,setVisibility] = useState(props.show);
    useEffect(() => {
        setVisibility(props.show) 
    }, [props.show])
    return(
        visibility && <ul className="suggestions-wrapper">
            {props.suggestions.length > 0 && props.suggestions.map((song) => {return <li onClick={(e) => { props.setSuggestion(song.title); setVisibility(false)}} key={song.id}>{song.title}</li>})}
        </ul>
    )
}   
