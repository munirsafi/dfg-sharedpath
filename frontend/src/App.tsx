import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./app/core/navbar/NavBar";

import Map from "./app/route-map/Map";
import Login from "./app/route-login/Login";
import Profile from "./app/route-profile/Profile";

export default function App() {
  return (
    <div id="sharedpath-app">
      <Router>
        {/* @ts-ignore */}
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
