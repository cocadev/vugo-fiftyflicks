import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import useGeolocation from "./useGeolocation";

// import LocationApi from "api/LocationApi";

export default function useGeoZoneSecurity() {
    const [isValidGeoZone, setIsValidGeoZone] = useState(false);
    // const [ipAddress, setIpAddress] = useState(null);
    const geolocation = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 12000,
    });

    useEffect(() => {
        async function getIp() {
            try {
                // const { ip } = await LocationApi.getIpAddress();
                // setIpAddress(ip);
            } catch (e) {
                console.error(e);
            }
        }

        if (isMobile) {
            getIp();
        } else {
            setIsValidGeoZone(true);
        }
    }, [isMobile]);

    useEffect(() => {
      
    }, [geolocation.error])

    return {
        isValidGeoZone,
    };
}
