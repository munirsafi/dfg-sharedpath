
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import './NavBar.scss'


interface Props {
    isLoggedIn: boolean
}

interface States {
    buttonText: string
    buttonOnClick?: string
    buttonRedirectLink?: string
}

function logOutButton() {
    return (
        <Button color="inherit">Logout</Button>
    );
}

export class NavBar extends React.Component<Props, States> {
    constructor (props: Props){
        super(props)
        this.state = {
            buttonText : this.props.isLoggedIn ? "Loggout" : "Login"
        }
    }

    render () {
    return (
        <div className="fg">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                        SP
                </IconButton>
                    <Typography variant="h6" className="fg">
                    </Typography>

                    <Button color="inherit">{this.state.buttonText}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
    }
}