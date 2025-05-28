import { configureStore, combineReducers } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers.jsx";
import * as Categories from "./Reducers/CategoriesReducers.jsx";
import * as Movies from "./Reducers/MoviesReducers.jsx";
const rootReducer = combineReducers({
    // user reducers
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileReducer,
    userChangePassword: User.userChangePasswordReducer,
    getFavoriteMovies: User.getFavoriteMoviesReducer,
    deleteFavoriteMovie: User.deleteFavoriteMovieReducer, 
    adminGetAllUsers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUserReducer,
    // categories reducers
    categoriesGetAll: Categories.getAllCategoriesReducer,
    categoriesCreate: Categories.createCategoryReducer,
    categoriesUpdate: Categories.updateCategoryReducer,
    categoriesDelete: Categories.deleteCategoryReducer,

    // movies reducers
    getAllMovies: Movies.getAllMoviesReducer,
});

// get user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// initialState
const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage,
    },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
})