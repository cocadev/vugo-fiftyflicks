import { deviceDetect } from "react-device-detect";

export const getDeviceId = () => {
    let deviceData = deviceDetect();

    if (deviceData.isBrowser) {
        console.log(
            "Device Info - ",
            deviceData.browserName +
                " | " +
                deviceData.osName +
                " " +
                deviceData.osVersion
        );
        return (
            deviceData.browserName +
            " | " +
            deviceData.osName +
            " " +
            deviceData.osVersion
        );
    }

    if (deviceData.isMobile) {
        console.log(
            "Device Info - ",
            deviceData.mobileVendor + " " + deviceData.mobileModel
        );
        return deviceData.mobileVendor + " " + deviceData.mobileModel;
    }

    return "12345";
};
