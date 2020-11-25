import { IHeader } from '../interfaces/header';

const Http = {

    API_URL: 'http://localhost:8000',
    
    /**
     * @summary     Generate HTTP headers for backend requests
     *
     * @author      Munir Safi
     * @since       2020-11-15
     * @param       authNeeded Indicate if this request needs authorization headers
     * @returns     HTTP header object
     */
    generateHeaders: (authNeeded ?: boolean): IHeader => {
        const headers: IHeader = {
            'Content-Type': 'application/json'
        };
        if (authNeeded && authNeeded === true) {
            const accessToken = localStorage.getItem('access_token');

            if (accessToken !== null) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return headers;
    }
}
export default Http;