import React, { useState, ChangeEvent } from 'react';

import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import NavBar from '../core/navbar/NavBar';
import './Profile.scss';
import Authentication from '../../services/Authentication';

export default function Profile() {

    const history = useHistory();
    if (Authentication.status() === false) {
        history.push('/');
    }

    const userInfo = Authentication.getInfo();

    const [firstName, setFirstName] = useState<string | undefined>(userInfo?.first_name);
    const [lastName, setLastName] = useState<string | undefined>(userInfo?.last_name);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(userInfo?.phone_number);
    const [emailAddress] = useState<string | undefined>(userInfo?.email);

    const [community, setCommunity] = useState<string | undefined>(userInfo?.community);
    const [communityRole, setCommunityRole] = useState<string | undefined>(userInfo?.community_role);
    const [communityPhone, setCommunityPhone] = useState<string | undefined>(userInfo?.community_phone);
    const [communityEmail, setCommunityEmail] = useState<string | undefined>(userInfo?.community_email);
    const [communityLink, setCommunityLink] = useState<string | undefined>(userInfo?.community_link);

    const [newPassword, setNewPassword] = useState<string | undefined>();
    const [confirmNewPassword, setConfirmNewPassword] = useState<string | undefined>();

    /**
     * @summary     Submit update of personal info to API
     * 
     * @author      Munir Safi
     * @since       2020-11-15
     */
    const updatePersonalInfo = async () => {
        const data = {
            'first_name': firstName,
            'last_name': lastName,
            'phone_number': phoneNumber
        }

        const status = await Authentication.changeInfo(data);
        if (status === true) {
            alert('Successfully changed your personal information!');
        } else {
            alert('An error occurred when attempting to update your information. Please try again.');
        }
    }

    /**
     * @summary     Submit update of community info to API
     * 
     * @author      Munir Safi
     * @since       2020-11-15
     */
    const updateCommunityInfo = async () => {
        const data = {
            'community': community,
            'community_role': communityRole,
            'community_phone': communityPhone,
            'community_email': communityEmail,
            'community_link': communityLink
        }

        const status = await Authentication.changeInfo(data);
        if (status === true) {
            alert('Successfully changed your community information!');
        } else {
            alert('An error occurred when attempting to update your information. Please try again.');
        }
    }

    const updatePassword = async () => {
        const status = await Authentication.changePassword(newPassword as string, confirmNewPassword as string);
        if (status === true) {
            alert('Successfully changed your password!');
        } else {
            alert('An error occurred when attempting to update your password. Please try again.');
        }
    }

    return (
        <div className='sharedpath-profile'>
            <NavBar/>
            <FormControl className='profile-form'>
                <FormLabel className='profile-label'>Profile Information</FormLabel>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='First Name'
                            defaultValue={firstName}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Last Name'
                            defaultValue={lastName}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Email'
                            defaultValue={emailAddress}
                            helperText="You cannot change your email address. If you'd like to update your email, please contact a SharedPath administrator."
                            variant='outlined'
                            fullWidth
                            disabled

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Phone Number'
                            defaultValue={phoneNumber}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value)}
                        />
                    </Grid>
                </Grid>

                <Button
                    size='large'
                    className='submit-button'
                    variant='contained'
                    color='primary'
                    onClick={() => updatePersonalInfo()}
                >
                    Update Personal Information
                </Button>

                <hr className='section-split' />

                <FormLabel className='profile-label'>Your Community</FormLabel>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Community Name'
                            defaultValue={community}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setCommunity(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Community Role'
                            defaultValue={communityRole}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setCommunityRole(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Community Phone Number'
                            defaultValue={communityPhone}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setCommunityPhone(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Community Email'
                            defaultValue={communityEmail}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setCommunityEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Community Policy Link'
                            defaultValue={communityLink}
                            variant='outlined'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setCommunityLink(event.target.value)}
                        />
                    </Grid>
                </Grid>

                <Button
                    size='large'
                    className='submit-button'
                    variant='contained'
                    color='primary'
                    onClick={() => updateCommunityInfo()}
                >
                    Update Community Information
                </Button>

                <hr className='section-split' />

                <FormLabel className='profile-label'>Change Password</FormLabel>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='New Password'
                            variant='outlined'
                            type='password'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Confirm New Password'
                            variant='outlined'
                            type='password'
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(event.target.value)}
                        />
                    </Grid>
                </Grid>

                <Button
                    size='large'
                    className='submit-button'
                    variant='contained'
                    color='primary'
                    onClick={() => updatePassword()}
                >
                    Update Password
                </Button>
            </FormControl>
        </div>
    );
}