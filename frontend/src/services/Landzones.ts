import axios, { AxiosResponse } from "axios";
import { FeatureCollection } from "geojson";
import { generateHeaders } from "./Authentication";

const API_URL: string = "http://localhost:8000/landzones";

const Landzones = {
  submit: async (landzones: FeatureCollection): Promise<void> => {
    const options = {
      headers: generateHeaders(true),
    };

    try {
      await axios.post(API_URL, landzones, options);
    } catch (err) {
      if (localStorage.getItem("DEBUG") === "*") {
        console.error(
          "An error occurred when attempting to submit landzones: ",
          err
        );
      }
    }
  },
  get: async (): Promise<FeatureCollection | null> => {
    const options = {
      headers: generateHeaders(true),
    };

    try {
      const response: AxiosResponse<FeatureCollection> = await axios.get(
        API_URL,
        options
      );
      return response.data;
    } catch (err) {
      if (localStorage.getItem("DEBUG") === "*") {
        console.error(
          "An error occurred when attempting to submit landzones: ",
          err
        );
      }
      return null;
    }
  },
};
