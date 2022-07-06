import { useContext } from "react";
import { AuthContext, initialData } from "./AuthContext";

const useAuth = () => {
    const [state, setState] = useContext(AuthContext);

    function clearUser() {
        setState(() => initialData.user);
    }

    function setUser(user) {
        setState((state) => ({ ...state, ...user }));
    }

    async function setProduct(product) {
        setState((state) => ({ ...state, userProduct: product }));
    }

    function isLogin() {
        return !!state.email;
    }

    function setAuthToken(token) {
        setState((state) => ({ ...state, authToken: token }));
    }

    return {
        clearUser,
        setUser,
        setProduct,
        isLogin,
        authToken: state.authToken,
        setAuthToken,
        access_token: state.access_token,
        user: state,
        isUserLoaded: state.isUserLoaded,
        userId: state.userId,
        userDrmToken: state.userDrmToken,
        name: `${state.firstName} ${state.lastName}`,
        hasActiveProduct:
            new Date(state.userProduct.endDateTime).getTime() >
            new Date().getTime(),
    };
};

export default useAuth;
