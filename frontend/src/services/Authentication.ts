import axios from 'axios';
import { AxiosResponse } from 'axios';

import { IHeader } from '../interfaces/header';
import { Token } from '../interfaces/token';

const API_URL: string = 'http://localhost:8000';

/**
 * @summary     Given a user is logged in and their active refresh token is valid,
 *              request a new refresh token
 * 
 * @author      Xunkai Chen, Munir Safi
 * @since       2020-11-14
 */
async function refreshToken() : Promise<void> {
    const options = {
        headers: generateHeaders(true)
    };

    const data = {
        'refresh': localStorage.getItem('refresh_token')
    };

    try {
        const response: AxiosResponse<Token> = await axios.post(`${API_URL}/refresh`, data, options);
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access)
        }
    } catch(err) {
        if (localStorage.getItem('DEBUG') === '*') {
            console.error('An error occurred when refreshing access token: ', err);
        }
    }
}

/**
 * @summary     Generate HTTP headers for backend requests
 * 
 * @author      Munir Safi
 * @since       2020-11-15
 * @param       authNeeded Indicate if this request needs authorization headers
 * @returns     HTTP header object
 */
function generateHeaders(authNeeded?: boolean) : IHeader {
    const headers: IHeader = {
        'Content-Type': 'application/json'
    }
    if (authNeeded && authNeeded === true) {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken !== null) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }

    return headers;
}

const Authentication = {
    /**
     * @summary     Given an email and password, attempts to login the user
     *              and fetch their JWT
     * 
     * @since       2020-11-14
     * @author      Xuankai Chen, Munir Safi
     * @param       email User's email address
     * @param       password User's plaintext password
     * @returns     True if user login attempt was successful, false if not
     */
    login: async (email: string, password: string): Promise<boolean> => {
        const data = {
            'email': email,
            'password': password
        };

        const options = {
            headers: generateHeaders()
        };

        try {
            const response: AxiosResponse<Token> = await axios.post(`${API_URL}/auth/token/`, data, options);
            if (response.data.access && response.data.refresh) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                return true
            }
        } catch(err) {
            if (localStorage.getItem('DEBUG') === '*') {
                console.error('An error occurred when attempting to login: ', err);
            }
            return false;
        }

        return false;
    },

    /**
     * @summary     Log out a user by destroying their stored tokens
     * 
     * @author      Xuankai Chen, Munir Safi
     * @since       2020-11-14
     */
    logout: (): void => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}

export default Authentication;
