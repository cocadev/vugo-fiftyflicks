import React, { useState } from "react";
// import UserApi from "../../api/UserApi";

const AuthContext = React.createContext([{}, () => { }]);

const initialData = {
    user: {
        userId: null,
        userDrmToken: null,
        email: null,
        firstName: null,
        lastName: null,
        role: null,
        userProduct: {},
        isUserLoaded: false,
    },
};

const AuthProvider = (props) => {
    var [state, setState] = useState(initialData.user);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const { data: user } = await UserApi.getUser();

    //             const { data: tokenResponse } = await UserApi.getDrmToken(
    //                 user.userId
    //             );

    //             user.userDrmToken = tokenResponse.userDrmToken;

    //             setState((state) => ({ ...state, ...user, isUserLoaded: true }));
    //         } catch (err) {
    //             setState(initialData.user);
    //             setState((state) => ({ ...state, isUserLoaded: true }));
    //         }
    //     };
    //     fetchUser();
    // }, []);

    return (
        <AuthContext.Provider value={[state, setState]}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, initialData };
