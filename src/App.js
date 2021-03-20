import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppDrawer from './components/AppDrawer'
import AllSongs from './pages/AllSongs'
import CreatePlaylist from './pages/CreatePlaylist'
import Playlist from './pages/Playlist'

function App() {
  const [open, setOpen] = useState(true);
  const [albumData, setAlbumData] = useState([]);
  const [songsData, setSongsData] = useState([]);

  useEffect(() => {
    window.innerWidth > 648 ? setOpen(true) : setOpen(false);
    function handleResize() {
      window.innerWidth > 648 ? setOpen(true) : setOpen(true);
    }
    window.addEventListener('resize', handleResize);

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
              setData(data);
            });
          }
        )
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
    }

    fetchFrom('https://jsonplaceholder.typicode.com/albums',setAlbumData);
    fetchFrom('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=1000',setSongsData);

  }, []);

  const toggleClick = () => {
    setOpen(!open);
  }

  return (
    <Router>
      <div className={`light-theme ${open ? 'nav-open' : ''}`}>
        <div className="hamburger-container">
          <input type="checkbox" onChange={toggleClick} checked={open} />
          <div className="span-container">
            <span className="block hamburger"></span>
            <span className="block hamburger"></span>
            <span className="block hamburger"></span>
          </div>
        </div>

        <AppDrawer></AppDrawer>
        <div className="grid-container">
          <div className="grid-item app-content">
            <div className="app-bg"></div>
            <div className="app-holder">
              <Switch>
                <Route path='/newplaylist' render={() => albumData.length>0 && songsData.length>0 &&<CreatePlaylist albums={albumData} songs={songsData}></CreatePlaylist>}/>
                <Route path='/playlist' component={Playlist} />
                <Route path='/' render={() => albumData.length>0 && songsData.length>0 &&<AllSongs albums={albumData} songs={songsData}></AllSongs>} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
