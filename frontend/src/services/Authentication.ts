import axios, { AxiosResponse } from 'axios';

import Http from './Http';

import { Token } from '../interfaces/token';
import { IUserData } from '../interfaces/userdata';

/**
 * @summary     Given a user is logged in and their active refresh token is valid,
 *              request a new refresh token
 *
 * @author      Xunkai Chen, Munir Safi
 * @since       2020-11-14
 */
async function refreshToken(): Promise<void> {
    const dt = Date.now() - expectedTime;

    const data = {
        'refresh': localStorage.getItem('refresh_token')
    };

    const options = {
        headers: Http.generateHeaders(true)
    };

    try {
        const response: AxiosResponse<Token> = await axios.post(`${Http.API_URL}/auth/token/refresh/`, data, options);
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
        }

        expectedTime += refreshInterval;
        refreshTimer = setTimeout(refreshToken, Math.max(0, refreshInterval - dt));
    } catch (err) {
        if (localStorage.getItem('DEBUG') === '*') {
            console.error('An error occurred when refreshing access token: ', err);

            if (err.response.status) {
                Authentication.logout();
            }
        }
    }
}

let expectedTime: number = 0;
let refreshTimer: any;
let refreshStarted = false;
let refreshInterval: number = 285000; // 4 min 45 secs

const Authentication = {

    /**
     * @summary     Checks to see if refresh token is saved, and starts the refresh
     *              interval if true
     * 
     * @author      Munir Safi
     * @since       2020-11-18
     */
    authenticate: async () : Promise<void> => {
        const refresh = localStorage.getItem('refresh_token');

        if (refresh !== '' && refresh !== null) {
            if (refreshStarted === false) {
                refreshStarted = true;
                expectedTime = Date.now() + refreshInterval;
                refreshToken();
            }
        }
    },

    /**
     * @summary     Change user password, and confirm new password is as the
     *              user expects
     *
     * @author      Munir Safi
     * @since       2020-11-15
     * @param       password New user password
     * @param       confirmPassword New user password that matches the first
     * @returns     True if successful, false if not
     */
    changePassword: async (password: string, confirmPassword: string): Promise<boolean> => {
        if (password !== confirmPassword) {
            return false;
        }

        const data = {
            password: password
        };

        const options = {
            headers: Http.generateHeaders(true)
        };

        try {
            const response: AxiosResponse<Token> = await axios.post(`${Http.API_URL}/auth/change-password`, data, options);
            if (response.data.access && response.data.refresh) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                return true;
            }
        } catch (err) {
            if (localStorage.getItem('DEBUG') === '*') {
                console.error( 'An error occurred when attempting to change password: ', err);
            }
            return false;
        }

        return false;
    },

    /**
     * @summary     Change user password, and confirm new password is as the
     *              user expects
     *
     * @author      Munir Safi
     * @since       2020-11-15
     * @param       password New user password
     * @param       confirmPassword New user password that matches the first
     * @returns     True if successful, false if not
     */
    changeInfo: async (data: any): Promise<boolean> => {
        const options = {
            headers: Http.generateHeaders(true)
        };

        try {
            const response: AxiosResponse<Token> = await axios.post(`${Http.API_URL}/auth/update-profile`, data, options);
            if (response.data.access && response.data.refresh) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                return true;
            }
        } catch (err) {
            if (localStorage.getItem('DEBUG') === '*') {
                console.error('An error occurred when attempting to change info: ', err);
            }
            return false;
        }

        return false;
    },

    /**
     * @summary     Gets the logged in user's information
     *
     * @author      Munir Safi
     * @since       2020-11-15
     * @returns     User information in JSON form
     */
    getInfo: (): IUserData | null => {
        const token = localStorage.getItem('access_token');

        if (token !== '' && token !== null) {
            const infoPayload = token.split('.')[1];
            const data = window.atob(infoPayload);
            const info = JSON.parse(data);

            delete info.user_id;
            delete info.jti;
            delete info.exp;
            delete info.token_type;

            return info;
        }

        return null;
    },

    /**
     * @summary     Given an email and password, attempts to login the user
     *              and fetch their JWT
     *
     * @since       2020-11-14
     * @author      Munir Safi, Xuankai Chen
     * @param       email User's email address
     * @param       password User's plaintext password
     * @returns     True if user login attempt was successful, false if not
     */
    login: async (email: string, password: string): Promise<boolean> => {
        const data = {
            email: email,
            password: password
        };

        const options = {
            headers: Http.generateHeaders()
        };

        try {
            const response: AxiosResponse<Token> = await axios.post(`${Http.API_URL}/auth/token/`, data, options);
            if (response.data.access && response.data.refresh) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                if (refreshStarted === false) {
                    refreshStarted = true;
                    expectedTime = Date.now() + refreshInterval;
                    setTimeout(refreshToken, refreshInterval);
                }

                return true;
            }
        } catch (err) {
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
        clearTimeout(refreshTimer);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    /**
     * @summary     Gets login status of the user
     *
     * @author      Munir Safi
     * @since       2020-11-15
     * @returns     True if the user is actively logged in, or false if not
     */
    status: (): boolean => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken !== '' && accessToken !== null) {
            return true;
        }

        return false;
    }
};

export default Authentication;
