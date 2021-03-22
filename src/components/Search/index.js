import React, { useState, useEffect } from 'react'
import './Search.css'
import { Search as Find ,XCircle } from 'react-bootstrap-icons'
import useDebounce from '../Debounce'
import SearchSuggestions from '../SearchSuggestions'

export default function SearchBar(props) {
    const [query, setQuery] = useState('');
    const [suggestions,setSuggestions] = useState('default');

    const debouncedValue = useDebounce(query, 500)
    
    const handleChange = (e) => {
        
        setQuery(e.target.value);
        if(e.target.value !==''){
            setSuggestions('');
            // props.isDefaultSearch(false);
        }else{
            setSuggestions('default');
            // props.isDefaultSearch(true);
        }
        // e.target.value !==''?setSuggestions(''):setSuggestions('default');props.isDefaultSearch(false);
    }

    const clearSearch = () => setQuery('');

    useEffect(() => {

        let result = props.Songs.filter(song => { return song.title.includes(debouncedValue) })
        props.filtered(result);
        suggestions !=='default' && setSuggestions(result);

    }, [debouncedValue])

    return (
        <div className="search-outer-wrapper">
            <div className="search-container">
                <Find className="find-icon"></Find>
                <XCircle size={16} className="cancel-icon" onClick={clearSearch}></XCircle>
                <input className="search-bar" value={query} type="text" placeholder="Search songs" onChange={handleChange}></input>
            </div>
            {suggestions !=='default' &&  suggestions!==''&&<SearchSuggestions suggestions={suggestions} setSuggestion = {setQuery}></SearchSuggestions>}
        </div>
    )
}