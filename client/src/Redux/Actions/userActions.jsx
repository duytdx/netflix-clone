import * as userConstants from "../Constants/userConstants.jsx";
import * as userAPI from "../APIs/userServices.jsx";
import { ErrorAction, tokenProtection } from "../Protection.jsx";
import { toast } from "react-toastify";

// LOGIN ACTIONS
const loginAction = (data) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });
        const response = await userAPI.loginService(data);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }
}

// REGISTER ACTIONS
const registerAction = (data) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const response = await userAPI.registerService(data);
        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
}

// LOGOUT ACTIONS
const logoutAction = () => async (dispatch) => {
    userAPI.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
}

// UPDATE PROFILE ACTIONS
const updateProfileAction = (data) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userAPI.updateProfileService(data);
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: response });
        toast.success("Profile updated successfully");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
}

// DELETE PROFILE ACTIONS
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
        await userAPI.deleteProfileService(getState().userLogin.userInfo.token);
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
        toast.success("Profile deleted successfully");
        dispatch(loginAction());
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
}

// CHANGE PASSWORD ACTIONS
const changePasswordAction = (password) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userAPI.changePasswordService(password, tokenProtection(getState));
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response });
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
}

// GET FAVORITE MOVIES ACTIONS
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
        const response = await userAPI.getFavoriteMovies(tokenProtection(getState));
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_SUCCESS, payload: response });
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
}

// DELETE FAVORITE MOVIES ACTIONS
const deleteFavoriteMovieAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIE_REQUEST });
        await userAPI.deleteFavoriteMovie(tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIE_SUCCESS });
        toast.success("All favorite movies deleted successfully");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIE_FAIL);
    }
}

// ADMIN GET ALL USERS ACTIONS
const getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
        const response = await userAPI.getAllUsers(tokenProtection(getState));
        dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response });
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
}

// ADMIN DELETE USER ACTIONS
const deleteUserAction = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_USER_REQUEST });
        await userAPI.deleteUser(userId, tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_USER_SUCCESS });
        toast.success("User deleted successfully");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.DELETE_USER_FAIL);
    }
}


export {
    loginAction,
    registerAction,
    logoutAction,
    updateProfileAction,
    deleteProfileAction,
    changePasswordAction,
    getFavoriteMoviesAction,
    deleteFavoriteMovieAction, getAllUsersAction, deleteUserAction
};

