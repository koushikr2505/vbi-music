import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppDrawer from './components/AppDrawer'
import AllSongs from './pages/AllSongs'
import CreatePlaylist from './pages/CreatePlaylist'

function App() {
  return (
    <Router>
      <div className="grid-container light-theme">
        <AppDrawer></AppDrawer>
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
    </Router>

  );
}

export default App;
