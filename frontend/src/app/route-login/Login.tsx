
import React, { useState, ChangeEvent } from 'react';

import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import './Login.scss'

import Authentication from '../../services/Authentication';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {' If your Indigenous community has land interests in Ontario but does not have an account, please contact '}
            <Link color="primary" href="mailto:admin@sharedpath.ca">
                admin@sharedpath.ca
            </Link>
        </Typography>
    );
}

export default function Login() {

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const history = useHistory();

    /**
     * @summary     Attempts to login using the inputted email and password
     * 
     * @author      Munir Safi
     * @since       2020-11-15
     */
    const submitLogin = async () : Promise<void> => {
        const status = await Authentication.login(email as string, password as string);
        if (status === true) {
            alert('Login successful! Redirecting you to the map screen');
            history.push('/');
        } else {
            alert('Invalid email or password provided, please try again!');
        }
    }

    return (
        <div className="sharedpath-login">
            <Container className="tm32" component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <div className="pad">
                        <Typography component="h1" variant="h5">
                            Login
                    </Typography>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <div className="pad">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => submitLogin()}
                        >
                            Login
                    </Button>
                    </div>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}
