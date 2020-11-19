import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authentication from './services/Authentication';

import Map from "./app/route-map/Map";
import Login from "./app/route-login/Login";
import Profile from "./app/route-profile/Profile";

export default function App() {

    Authentication.authenticate();

    return (
        <div id="sharedpath-app">
            <Router>
                <div className="sharedpath-page">
                    <Switch>
                        <Route exact path="/" component={Map} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}
