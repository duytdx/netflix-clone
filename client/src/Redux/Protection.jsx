import { logoutAction } from "./Actions/userActions.jsx";

export const ErrorAction = (error, dispatch, action) => {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
        dispatch(logoutAction());
    }
    return dispatch({ type: action, payload: message });
}

// api token protection
export const tokenProtection = (getState) => {
    const { userLogin } = getState();
    if (!userLogin?.userInfo?.token) {
        return null;
    }
    return userLogin.userInfo.token;
}
