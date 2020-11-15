
import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import './Login.scss'

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

    return (
        <Container className="tm32" component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
                <div className="pad">
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                </div>
                <form noValidate>
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
                            />
                        </Grid>
                    </Grid>
                    <div className="pad">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
