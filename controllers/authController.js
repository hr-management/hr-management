const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
require("dotenv").config();


const salt = process.env.JWT_SALT;

// User signup
const userSignup = async (req, res) => {
    const { username, email, password } = req.body;
    //check if email or username is unique
    const existingEmailUser = await userModel.findOne({ email });
    if (existingEmailUser) {
        return res.status(400).json({
            success: false,
            message: 'Email address is already in use',
        });
    }

    const existingUsernameUser = await userModel.findOne({ username });
    if (existingUsernameUser) {
        return res.status(400).json({
            success: false,
            message: 'Username is already in use',
        });
    }

    const user = new userModel({
        username,
        email,
        password
    });
    await userModel.register(user);
    const token = jwt.sign({ user: user }, salt);
    res.status(200).json({ success: true, data: user, token: token });
};

// User login
const userLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid username or password' });
    }
    userModel.login(password, user).then(
        () => {
            //updated to only pass userId
            const token = jwt.sign({ userId: user._id }, salt);
            res.status(200)
                .json({ success: true, message: 'Login successful', data: user, token });
        },
        (err) => {
            return res
                .status(400)
                .json({ success: false, message: err || 'Invalid username or password' });
        }
    );
};

const userInfo = async (req, res) => {
    res.status(200).json({ success: true, user: req.tokenUser });
};

//updateUserInfo, lack of Documents update
const updateUserInfo = async (req, res) => {
    const id = req.tokenUser._id;
    try {
        const user = await userModel.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { ...req.body },
            { new: true });
        res.status(200).json({ success: true, user: user });
    } catch (err) {
        return res
            .status(400)
            .json({ success: false, message: err || 'updated error' });
    }
};

module.exports = {
    userSignup,
    userLogin,
    userInfo,
    updateUserInfo
};