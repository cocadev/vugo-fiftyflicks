import ApiHelper from "./ApiHelper";

import axios from "axios";

function checkLocationValid(lat, lng, ip) {
    //return ApiHelper({
    //url: "/locations/check",
    //method: "POST",
    //data: { lat: lat, lng: lng, ip: ip },
    //});
    return Promise.resolve({
        data: { isInZone: true, isWhiteListedIp: true, result: true },
    });
}

function getIpAddress() {
    return axios
        .get("https://api.ipify.org/?format=json", {
            withCredentials: false,
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response || error.message));
}

const LocationApi = {
    checkLocationValid,
    getIpAddress,
};

export default LocationApi;
