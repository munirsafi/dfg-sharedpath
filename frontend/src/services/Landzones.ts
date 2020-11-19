import axios, { AxiosResponse } from "axios";

import Http from "./Http";

import { ILandZone } from './../interfaces/landzone';

const LandzoneZPI = {
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
    get: async (): Promise<any> => {
        const options = {
            headers: Http.generateHeaders(),
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
};
export default LandzoneZPI;
