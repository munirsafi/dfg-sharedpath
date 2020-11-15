import axios from "axios";
import { AxiosResponse } from "axios";
import { Token } from "../models/token";

const API_URL: string = "http://localhost:8000/api/token";

const login = async (email: string, password: string): Promise<void> => {
  const response: AxiosResponse<Token> = await axios.post(
    API_URL,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.data.access) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
};

const refreshToken = async (refresh: string): Promise<void> => {
  const response: AxiosResponse<Token> = await axios.post(
    `${API_URL}/refresh`,
    { refresh },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.data.access) {
    const token: Token = JSON.parse(localStorage.getItem("token") || "");
    token.access = response.data.access;
    localStorage.setItem("token", JSON.stringify(token));
  }
};

const logout = (): void => {
  localStorage.removeItem("token");
};

export {
  login, refreshToken, logout
}
