import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Login from './app/route-login/Login'
import NavBar from './app/core/navbar/NavBar'

import Map from './app/route-map/Map'

export default function App() {

    let isLoggedIn: boolean = false;
    
    return (
        <div id="sharedpath-app">            
            <Router>
                { /* @ts-ignore */ }
                <NavBar isLoggedIn={isLoggedIn} />

                <Switch>
                    <Route exact path="/" component={Map} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
        </div>
    );
}
