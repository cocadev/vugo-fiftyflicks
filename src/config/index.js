const config = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    CASTLABS_LICENSE: process.env.REACT_APP_CASTLABS_LICENSE,
    CHROMECAST_APP_ID: process.env.REACT_APP_CHROMECAST_APP_ID,
    STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,

    // Enable or disable the entire Auth0 integration,
    // and substitute it with the internal version.
    AUTH0_ENABLED: process.env.REACT_APP_AUTH0_ENABLED,
    AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE,

    STAGING: process.env.REACT_APP_STAGING,

    GA_TRACKING_ID: "UA-168928878-2", // Test GA Tracking Code
};

export default config;
