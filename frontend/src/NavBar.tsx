
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";

import './NavBar.scss'


interface Props {
    isLoggedIn: boolean
    history: any
}

interface States {
    isLoggedIn: boolean
    buttonText: string,
}


export default class NavBar extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props)
        this.state = {
            buttonText: this.props.isLoggedIn ? "Logout" : "Login",
            isLoggedIn: this.props.isLoggedIn
        }
    }

    render() {
        let routeChange = () => {
            let path = `/login`;
            if (this.state.isLoggedIn) {
                this.props.history.push('/')
            }else {
                this.props.history.push('/home')
            }
            this.setState({
                isLoggedIn: this.state.isLoggedIn ? false : true
            })
            this.setState({
                buttonText: this.props.isLoggedIn ? "Logout" : "Login",
            })
        }

        return (
            <div className="fg">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                            SP
                </IconButton>
                        <Typography variant="h6" className="fg">
                        </Typography>
                        <Button color="inherit" onClick={routeChange}>{this.state.buttonText}</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}