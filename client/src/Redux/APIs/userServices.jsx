import API from "./Axios.jsx";

// register new user API call
export const registerService = async (user) => {
    const {data} = await API.post("/users", user);
    if(data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
}

// logout user API call
export const logoutService = async () => {
    localStorage.removeItem("userInfo");
    return null;
}

// login user API call
export const loginService = async (user) => {
    const {data} = await API.post("/users/login", user);
    if(data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
}

// update profile API call
export const updateProfileService = async (user) => {
    const {data} = await API.put("/users", user);
    if(data) {
        // Update localStorage with new user info but keep the same token
        const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        const updatedUserInfo = {
            ...data,
            token: currentUserInfo.token // Keep the existing token
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    }
    return data;
}

// delete user API call
export const deleteProfileService = async (token) => {
    const {data} = await API.delete("/users",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if(data) {
        localStorage.removeItem("userInfo");
    }
    return data;
}

// change password API call
export const changePasswordService = async (password, token) => {
    const {data} = await API.put("/users/password", {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}   

// get all favorite movies API call
export const getFavoriteMovies = async (token) => {
    const {data} = await API.get("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}

// delete favorite movie API call
export const deleteFavoriteMovie = async (movieId, token) => {
    const {data} = await API.delete("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}

// admin get all users API call
export const getAllUsers = async (token) => {
    const {data} = await API.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}

// admin delete user API call
export const deleteUser = async (userId, token) => {
    const {data} = await API.delete(`/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}