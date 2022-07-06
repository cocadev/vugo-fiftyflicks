import React, { useState } from "react";

// APIs & utils
import useAuth from "components/auth/useAuth";
import { getDeviceId } from "shared/utils/getDeviceId";
import UserApi from "api/UserApi";

//Components
import SocialButton from "components/SocialButton";
import ButtonSpinner from "components/spinners/ButtonSpinner";
import { useAlert } from "react-alert";

// Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
}));

function Social(props) {
    const classes = useStyles();
    const { setUser, updateIpAddress } = useAuth();
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    async function Sociallogin(user) {
        // login with facebook then authenticate with the API to get a JWT auth token
        let token = user._token.accessToken;
        let provider = user._provider;
        const deviceId = getDeviceId();
        setLoading(true);

        UserApi.socialLogin(provider, token, deviceId)
            .then((res) => {
                localStorage.setItem("access_token", res.token.access_token);
            })
            .catch((err) => {
                console.log(err);
            })
            .then((res) => {
                UserApi.getUser()
                    .then((res) => {
                        setUser(res.data);
                        updateIpAddress();
                        props.handleModalClose();
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
            })
            .catch((err) => {
                alert.error(
                    "There was an error logging you in. Please contact vugo."
                );
                console.log(err);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className={classes.root}>
            <SocialButton
                variant="contained"
                color="primary"
                onLoginSuccess={(user) => Sociallogin(user)}
                provider="google"
                appId="618248041494-frbvrfffii0qtru29n8qr2n6vg1h59ft.apps.googleusercontent.com"
            >
                {loading ? <ButtonSpinner /> : `${props.text} with Google`}
            </SocialButton>
            <SocialButton
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                onLoginSuccess={(user) => Sociallogin(user)}
                provider="facebook"
                appId="387128769250678"
            >
                {loading ? <ButtonSpinner /> : `${props.text} with Facebook`}
            </SocialButton>
        </div>
    );
}

export default Social;
