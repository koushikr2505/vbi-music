import './App.css'
import React, { useState, useEffect,useRef } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'
import AppDrawer from './components/AppDrawer'
import useOutsideClick from './components/UseOutsideClick'
import AllSongs from './pages/AllSongs'
import CreatePlaylist from './pages/CreatePlaylist'
import Playlist from './pages/Playlist'
import Edit from './pages/Edit'

function App() {
  const ref = useRef();
  
  const [open, setOpen] = useState(false);
  const [albumData, setAlbumData] = useState('default');
  const [songsData, setSongsData] = useState('default');
  const [playlists,refreshlist] = useState([]);

  useOutsideClick(ref, () => {
    setOpen(false);
});

  useEffect(() => {
    window.innerWidth > 648 ? setOpen(true) : setOpen(false);
    

    function fetchFrom(url,setData) {
      fetch(url)
        .then(
          function (response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            response.json().then(function (data) {
              if(setData === 'songs'){
                setSongsData(JSON.stringify(data));
                window.localStorage.setItem('songsCache',JSON.stringify(data));
                console.dir('songs');
              }else if(setData === 'album'){
                console.dir('albums');
                setAlbumData(JSON.stringify(data));                
                window.localStorage.setItem('albumCache',JSON.stringify(data));
              }

            });
          }
        )
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
    }

   
    albumData ==='default' && window.localStorage.getItem('albumCache') === null ? fetchFrom('https://jsonplaceholder.typicode.com/albums','album'):setAlbumData(window.localStorage.getItem('albumCache'));
    songsData ==='default'&& window.localStorage.getItem('songsCache') === null ? fetchFrom('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=300','songs'):setSongsData(window.localStorage.getItem('songsCache'));
  }, [albumData,songsData]);

  const toggleClick = () => {
    setOpen(!open);
  }

  return (
    <Router>
      <div className={`light-theme ${open ? 'nav-open' : ''}`}>
        <div className="hamburger-container" ref={ref}>
          <input type="checkbox" onChange={toggleClick} checked={open} />
          <div className="span-container">
            <span className="block hamburger"></span>
            <span className="block hamburger"></span>
            <span className="block hamburger"></span>
          </div>
        </div>

        <AppDrawer updatedplaylists={playlists}></AppDrawer>
        <div className="grid-container">
          <div className="grid-item app-content">
            <div className="app-bg"></div>
            <div className="app-holder">
              <Switch>
                <Route path="/newplaylist" render={() => albumData.length>0 && albumData!=='default'&& songsData.length>0 && songsData!=='default'&&<CreatePlaylist refresh ={refreshlist} albums={JSON.parse(albumData)} songs={JSON.parse(songsData)}></CreatePlaylist>}/>
                <Route path="/playlist/:playlistid" render={() => albumData.length>0 && albumData!=='default'&& songsData.length>0 && songsData!=='default'&&<Playlist updatedplaylists={playlists} refresh={refreshlist} albums={JSON.parse(albumData)} songs={JSON.parse(songsData)}></Playlist>} />
                <Route path="/edit/:playlistid" render={() => albumData.length>0 && albumData!=='default'&& songsData.length>0 && songsData!=='default'&&<Edit updatedplaylists={playlists} refresh={refreshlist} albums={JSON.parse(albumData)} songs={JSON.parse(songsData)}></Edit>} />
                <Route path='/playlist' render={() => albumData.length>0 && albumData!=='default'&& songsData.length>0 && songsData!=='default'&&<Playlist refresh={refreshlist} albums={JSON.parse(albumData)} songs={JSON.parse(songsData)}></Playlist>} />
                <Route path='/' render={() =>  albumData.length>0 && albumData!=='default'&& songsData.length>0 && songsData!=='default'&&<AllSongs albums={JSON.parse(albumData)} songs={JSON.parse(songsData)}></AllSongs>} />
              </Switch>
              <ScrollToTop></ScrollToTop>
            </div>
          </div>
        </div>
      </div>
      
    </Router>

  );
}

export default App;
