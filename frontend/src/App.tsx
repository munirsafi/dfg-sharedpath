import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import Login from './Login'
import NavBar from './NavBar'
import { Map } from './components/map/Map';
import historyWrapper from './NavBar'
import NewPage from './NewPage'
import './App.scss';

function App() {
    var isLoggedIn: Boolean = false;
    var goLogIn: Boolean = false;
    
    return (
        <div className="App">
            {/* <NavBar isLoggedIn={false} history={useHistory()}/>
            <Login/> */}

            <NavBar isLoggedIn={true} history={useHistory()}/>
            <NewPage/>
            <Map />
            
           {/*} <Router>
                <Switch>
                    <Route path="/" component={NewPage}/>
                    <Route path="/login" component={Login}/>
                </Switch>
    </Router>*/}
        </div >
    );
}
