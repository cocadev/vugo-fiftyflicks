import config from "../config";
import axios from "axios";

const Axios = axios.create({
    baseURL: config.API_BASE_URL,
});

export const setAuthorizationToken = (token) => {
    Axios.interceptors.request.use(config => {
        config.headers.Authorization = `bearer ${token}`;
        return config;
    });
}

const ApiHelper = function (options) {
    const onSuccess = function (response) {
        return response.data;
    };

    const onError = function (error) {
        return Promise.reject(error || error.response);
    };

    return Axios(options).then(onSuccess).catch(onError);
};

export default ApiHelper;
