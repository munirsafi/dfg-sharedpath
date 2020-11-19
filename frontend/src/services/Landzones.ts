import axios, { AxiosResponse } from "axios";

import Http from "./Http";

import { ILandZone } from './../interfaces/landzone';

const LandzoneZPI = {
    get: async (): Promise<any> => {
        const options = {
            headers: Http.generateHeaders()
        };

        try {
            const response: AxiosResponse<any> = await axios.get(`${Http.API_URL}/api/landzones/`, options);
            return response.data.landzones;
        } catch (err) {
            if (localStorage.getItem("DEBUG") === "*") {
                console.error("An error occurred when attempting to submit landzones: ", err);
            }
            return null;
        }
    },

    submit: async (landzoneList: ILandZone[]): Promise<void> => {
        const options = {
            headers: Http.generateHeaders(true),
        };
        const data = {
            landzones: landzoneList
        }

        try {
            const response = await axios.post(`${Http.API_URL}/api/landzones/`, data, options);
        } catch (err) {
            if (localStorage.getItem("DEBUG") === "*") {
                console.error("An error occurred when attempting to submit landzones: ", err);
            }
        }
    },

    /**
     * @summary     Given a list of landzones to update, send to API via PUT
     *              request
     * 
     * @author      Munir Safi
     * @since       2020-11-19
     */
    update: async (landzoneList: ILandZone[]): Promise<void> => {
        const options = {
            headers: Http.generateHeaders(true)
        }

        const data = {
            landzones: landzoneList
        }

        try {
            const response: AxiosResponse<any> = await axios.put(`${Http.API_URL}/api/landzones/`, data, options);
        } catch (err) {
            if (localStorage.getItem("DEBUG") === "*") {
                console.error("An error occurred when attempting to submit landzones: ", err);
            }
        }
    }
};
export default LandzoneZPI;
