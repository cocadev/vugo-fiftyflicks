// Created: 26 June 2020

import React, { Fragment, useState } from "react";

// APIs & utils
import UserApi from "api/UserApi";
import useAuth from "components/auth/useAuth";
import { getDeviceId } from "shared/utils/getDeviceId";

// Screens

// Components
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useAlert } from "react-alert";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        height: 45,
        width: "calc(100% - 20px)",
        padding: 10,

        fontFamily: "Roboto",
        fontWeight: 700,
        color: "rgba(0, 0, 0, 0.54)",
        lineHeight: "normal",
        fontSize: 14,
        textDecoration: "none",

        cursor: "pointer",
        display: "inline-flex",

        //transition: "background-color .3s,border-color .3s",
        backgroundColor: "#fff",
        "&:hover": {
            color: "#24baef",
            boxShadow:
                "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px",
        },
        //border: "2px solid transparent",
        // boxShadow:
        //     "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px",
    },
    googleIcon: {
        marginRight: 10,
        background: "rgb(255, 255, 255)",
        borderRadius: 2,
    },
}));

const GoogleButton = (props) => {
    const classes = useStyles();

    return (
        <Button
            onClick={props.onClick}
            disabled={props.disabled}
            className={classes.button}
            // variant="contained"
        >
            <div className={classes.googleIcon}>
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#000" fillRule="evenodd">
                        <path
                            d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                            fill="#EA4335"
                        ></path>
                        <path
                            d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                            fill="#4285F4"
                        ></path>
                        <path
                            d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                            fill="#FBBC05"
                        ></path>
                        <path
                            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                            fill="#34A853"
                        ></path>
                        <path fill="none" d="M0 0h18v18H0z"></path>
                    </g>
                </svg>
            </div>
            {props.buttonText}
        </Button>
    );
};

const CLIENT_ID =
    "618248041494-frbvrfffii0qtru29n8qr2n6vg1h59ft.apps.googleusercontent.com";

const GoogleAuthBtn = (props) => {
    const alert = useAlert();

    const [isLogined, setIsLogined] = useState(false);

    const { setUser, updateIpAddress } = useAuth();

    const login = (response) => {
        if (response.accessToken) {
            setIsLogined(true);

            // Make backend login call using accessToken or other Google creds
            UserApi.loginWithGoogle(getDeviceId(), response.tokenId)
                .then((res) => {
                    localStorage.setItem(
                        "access_token",
                        res.data.token.access_token
                    );
                    return Promise.resolve(res);
                })
                .then((res) => {
                    UserApi.getUser().then((res) => {
                        setUser(res.data);
                        updateIpAddress();
                        props.handleModalClose();
                    });
                })
                .catch((err) => {
                    alert.error(
                        "There was an error logging you in. Please contact vugo."
                    );
                    console.log(err);
                });
        } else {
            handleLoginFailure(response);
        }
    };

    const logout = () => {
        setIsLogined(false);
    };

    const handleLoginFailure = (response) => {
        console.log(response);
        // alert.error("Failed to log in");
    };

    const handleLogoutFailure = (response) => {
        console.log(response);
        // alert.error("Failed to log out");
    };

    // if (userId) {
    // 	return <Redirect to="/" />;
    // }

    return (
        <Fragment>
            {isLogined ? (
                <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    onFailure={handleLogoutFailure}
                    render={(renderProps) => (
                        <GoogleButton
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            buttonText="Logout"
                        />
                    )}
                ></GoogleLogout>
            ) : (
                <Fragment>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        render={(renderProps) => (
                            <GoogleButton
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                buttonText={props.buttonText}
                            />
                        )}
                        onSuccess={login}
                        onFailure={handleLoginFailure}
                        cookiePolicy={"single_host_origin"}
                        responseType="code,token"
                        // isSignedIn={true}
                    />
                </Fragment>
            )}
        </Fragment>
    );
};

export default GoogleAuthBtn;
