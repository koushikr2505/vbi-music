import './App.css'
import React , {useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppDrawer from './components/AppDrawer'
import ToggleMenu from './components/ToggleMenu'
import AllSongs from './pages/AllSongs'
import CreatePlaylist from './pages/CreatePlaylist'

function App() {
  const [open,setOpen] = useState(true);
  useEffect(() => {
    window.innerWidth>648?setOpen(true):setOpen(false);
    function handleResize() {
       window.innerWidth>648?setOpen(true):setOpen(true);
    }
    window.addEventListener('resize', handleResize);
},[]);

  return (
    <Router>
      
      <div className={`light-theme ${open && 'nav-open'}`}>
        <ToggleMenu></ToggleMenu>
        <AppDrawer></AppDrawer>
        <div className="grid-container">
          <div className="grid-item app-content">
            <div className="app-bg"></div>
            <div className="app-holder">
              <Switch>
                <Route path='/newplaylist' component={CreatePlaylist} />
                <Route path='/' component={AllSongs} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
