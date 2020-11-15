
import React from 'react';
import { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { useHistory } from "react-router-dom";

import './NavBar.scss'


interface Props {
    isLoggedIn: boolean;
    history: any;
}


export default function NavBar(props: any) {

    const [loginText, setLoginText] = useState(props.isLoggedIn ? 'Logout' : 'Login');

    const history = useHistory();

    return (
        <div className="fg">
            <AppBar position="static">
                <Toolbar className="header-toolbar">
                    <IconButton
                        edge="start"
                        className="menu-button"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => history.push('/')}
                    >
                        SP
                    </IconButton>

                    <Button
                        onClick={() => history.push('/login')}
                        color="inherit"
                    >
                        {loginText}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );

}
