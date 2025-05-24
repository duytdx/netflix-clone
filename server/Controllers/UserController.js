import User from "../Models/UserModels.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";
//@desc Register a new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExists = await User.findOne({ email });
        // if user already exists
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        // else create user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user in db
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image
        });

        // if user created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // find user in db
        const user = await User.findOne({ email });
        // if user exists compare password with hashed password then send user data and token to client
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
            // if user not found or password not match send error message
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ********** PRIVATE ROUTES **********
// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image, password } = req.body;
    try {
        // find user in db
        const user = await User.findById(req.user._id);
        // if user exists update user data
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            // if password is provided, hash it and update
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            const updatedUser = await user.save();
            // send updated user data to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete user
// @route DELETE /api/users/delete
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        // find user in db
        const user = await User.findById(req.user._id);
        // if user exists delete user
        if (user) {
            // is user is admin throws error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Admin user cannot be deleted");
            }
            // else delete user from db
            await user.deleteOne();
            res.json({ message: "User deleted successfully" });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// @desc Change user password
// @route PUT /api/users/password
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        // find user in db
        const user = await User.findById(req.user._id);
        // if user exists compare old password with hashed password then update user password and save it in db
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            // hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            // save user in db
            await user.save();
            res.json({ message: "Password updated successfully" });
        }
        // else send error message
        else {
            res.status(400);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc get all liked movies
// @route GET /api/users/favorites
// @access Private
const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in db 
        const user = await User.findById(req.user._id).populate("likedMovies");
        // if user exists send liked movies to client
        if (user) {
            res.json(user.likedMovies);
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// desc add movie to liked movies
// @route POST /api/users/favorites
// @access Private
const addLikedMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        // find user in db
        const user = await User.findById(req.user._id);
        // if user exists add movie to liked movies and save it in db
        if (user) {
            // check if movie already liked
            // if movie already liked send error message
            if (user.likedMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Movie already liked");
            }
            // else add movie to liked movies and save it in db
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies);
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// desc Delete movie from liked movies
// @route DELETE /api/users/favorites
// @access Private
const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in db
        const user = await User.findById(req.user._id);
        // if user exists delete movie from liked movies and save it in db
        if (user) {
            user.likedMovies = [];
            await user.save();
            res.json({ message: "All liked movies deleted successfully" });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ********** ADMIN CONTROLLERS **********

// @desc get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    try {
        // find all users in db
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // find user in db
        const user = await User.findById(req.params.id);
        // if user exists delete user 
        if (user) {
            // if user is admin throws error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete admin user");
            }
            // else delete user from db
            await user.deleteOne();
            res.json({ message: "User deleted successfully" });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    getLikedMovies,
    addLikedMovies,
    deleteLikedMovies,
    getUsers,
    deleteUser
};
