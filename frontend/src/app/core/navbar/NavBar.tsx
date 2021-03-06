
import React from 'react';
import { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { useHistory } from "react-router-dom";

import './NavBar.scss'
import Logo from '../../../assets/images/logo.svg';
import Authentication from '../../../services/Authentication';

export default function NavBar(props: any) {
    
    const [isLoggedIn,] = useState(Authentication.status());

    const history = useHistory();
    let buttons;

    function logout () {
        Authentication.logout();
        history.push('/');
        window.location.reload();
        alert("You will be logged out now");
    }

    if (isLoggedIn) {
        buttons = <div>
            <Button
                onClick={() => history.push('/profile')}
                color="inherit"
            >
                Profile Page
        </Button>
            <Button
                onClick={() => logout()}
                color="inherit"
            >
                Logout
            </Button>
        </div>
    } else {
        buttons = <Button
            onClick={() => history.push('/login')}
            color="inherit"
        >
            Login
        </Button>
    }

    return (
        <div className="header">
            <AppBar position="static" className="header-appbar">
                <Toolbar className="header-toolbar">
                    <IconButton
                        edge="start"
                        className="menu-button"
                        aria-label="menu"
                        onClick={() => history.push('/')}
                        disableRipple
                    >
                        <img src={Logo} alt="logo" />
                    </IconButton>
                    {buttons}
                </Toolbar>
            </AppBar>
        </div>
    );

}
