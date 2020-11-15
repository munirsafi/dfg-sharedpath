import React from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import './Profile.scss';

export default function Profile() {

    return (
        <div className='sharedpath-profile'>
            <FormControl className='profile-form'>
                <FormLabel className='profile-label'>Profile Information</FormLabel>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='First Name'
                            id='outlined-margin-none'
                            defaultValue='First'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Last Name'
                            id='outlined-margin-none'
                            defaultValue='Last'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Email'
                            id='outlined-margin-none'
                            defaultValue='email@email.com'
                            helperText="You cannot change your email address. If you'd like to update your email, please contact a SharedPath administrator."
                            variant='outlined'
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Phone Number'
                            id='outlined-margin-none'
                            defaultValue='+9999999999'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Button size='large' className='submit-button' variant='contained' color='primary'>Update Personal Information</Button>

                <hr className='section-split' />

                <FormLabel className='profile-label'>Your Community</FormLabel>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label='Community Name'
                            id='outlined-margin-none'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Community Role'
                            id='outlined-margin-none'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Button size='large' className='submit-button' variant='contained' color='primary'>Update Community Information</Button>

                <hr className='section-split' />

                <FormLabel className='profile-label'>Change Password</FormLabel>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label='Current Password'
                            id='outlined-margin-none'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='New Password'
                            id='outlined-margin-none'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Confirm New Password'
                            id='outlined-margin-none'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Button size='large' className='submit-button' variant='contained' color='primary'>Update Password</Button>
            </FormControl>
        </div>
    );
}