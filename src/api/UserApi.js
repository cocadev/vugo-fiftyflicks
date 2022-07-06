import ApiHelper from "./ApiHelper";

function getUser() {
    return ApiHelper({
        url: "/users/me",
        method: "GET",
    });
}

function getDrmToken(userId) {
    return ApiHelper({
        url: `/users/${userId}/drm-token`,
        method: "GET",
    });
}

function login(email, password, deviceId) {
    return ApiHelper({
        url: "/users/signin",
        method: "POST",
        data: {
            email: email,
            password: password,
            deviceId: deviceId,
        },
    });
}

function socialLogin(provider, token, deviceId) {
    return ApiHelper({
        url: "/users/social-sign-in",
        method: "POST",
        data: {
            provider: provider,
            token: token,
            deviceId: deviceId,
        },
    });
}

function loginWithGoogle(deviceId, idToken) {
    return ApiHelper({
        url: "/users/google-sign-in",
        method: "POST",
        data: {
            deviceId: deviceId,
            idToken: idToken,
        },
    });
}

function loginWithFacebook(deviceId, email, fullName) {
    return ApiHelper({
        url: "/users/facebook-sign-in",
        method: "POST",
        data: {
            deviceId: deviceId,
            email: email,
            fullName: fullName,
        },
    });
}

function logout(deviceId) {
    return ApiHelper({
        url: "/users/sign-out",
        method: "POST",
        data: {
            deviceId: deviceId,
        },
    });
}

function signUp(email, firstName, lastName, password) {
    return ApiHelper({
        url: "/users/signup",
        method: "POST",
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        },
    });
}

function updateUser(userId, firstName, lastName) {
    return ApiHelper({
        url: `/users/${userId}`,
        method: "PUT",
        data: {
            firstName: firstName,
            lastName: lastName,
        },
    });
}

function updateUserEmail(userId, firstName, lastName, email) {
    return ApiHelper({
        url: `/users/${userId}`,
        method: "PUT",
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
        },
    });
}

function activateAccount(userId, token) {
    return ApiHelper({
        url: `users/${userId}/activate`,
        data: { ActivationToken: token },
        method: "POST",
    });
}

function forgotPassword(email) {
    return ApiHelper({
        url: `users/forgot-password`,
        data: { email: email },
        method: "POST",
    });
}

function changePassword(email, currentPassword, newPassword) {
    return ApiHelper({
        url: `users/change-password`,
        data: {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
        },
        method: "POST",
    });
}

function resetPassword(userId, resetPasswordToken, newPassword) {
    return ApiHelper({
        url: `users/${userId}/reset-password`,
        data: {
            resetPasswordToken: resetPasswordToken,
            newPassword: newPassword,
        },
        method: "POST",
    });
}

function getRegisteredDevices(userId) {
    return ApiHelper({
        url: `users/${userId}/devices`,
        method: "GET",
    });
}

function getRecentHistory(userId) {
    return ApiHelper({
        url: `users/${userId}/recent-activities`,
        method: "GET",
    });
}

const UserApi = {
    getUser,
    getDrmToken,
    login,
    loginWithGoogle,
    loginWithFacebook,
    socialLogin,
    logout,
    signUp,
    updateUser,
    activateAccount,
    forgotPassword,
    changePassword,
    resetPassword,
    getRegisteredDevices,
    getRecentHistory,
    updateUserEmail,
};

export default UserApi;
