import React from 'react';
import logo from './logo.svg';
import L from 'leaflet';
import Login from './Login'
import { NavBar } from './NavBar'
import './App.scss';

function App() {
    var isLoggedIn: Boolean = false;
    var goLogIn: Boolean = false;

    return (
        <div className="App">
            <NavBar isLoggedIn={false} ></NavBar>
            <Login></Login>
        </div>
    );
}

export default App;
