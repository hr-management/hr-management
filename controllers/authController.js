const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const uuid = require('uuid');
require("dotenv").config();


const salt = process.env.JWT_SALT;

// User signup
const userSignup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('1111');
    if (!validator.isLength(username, { min: 3, max: 30 })) {
        return res.status(400).json({
            success: false,
            message: 'The length of the username is between 3-30 characters',
        });
    }
    if (!validator.isEmail(email)) {
        return res
            .status(400)
            .json({ success: false, message: 'Incorrect email format' });
    }
    if (!validator.isLength(password, { min: 3, max: 30 })) {
        return res.status(400).json({
            success: false,
            message: 'The length of the password is between 3-30 characters',
        });
    }
    //check if email or username is unique
    const existingEmailUser = await userModel.findOne({ email });
    const existingUsernameUser = await userModel.findOne({ username });
    if (existingEmailUser) {
        return res.status(400).json({
            success: false,
            message: 'Email address is already in use',
        });
    }
    if (existingUsernameUser) {
        return res.status(400).json({
            success: false,
            message: 'Username is already in use',
        });
    }

    const user = new userModel({
        _id: uuid.v4(),
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
    if (!validator.isLength(username, { min: 3, max: 30 })) {
        return res
            .status(400)
            .json({ success: false, message: 'he length of the username is between 3-30 characters' });
    }
    if (!validator.isLength(password, { min: 3, max: 30 })) {
        return res.status(400).json({
            success: false,
            message: 'The length of the password is between 3-30 characters',
        });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid username or password' });
    }
    userModel.login(password, user).then(
        () => {
            const token = jwt.sign({ user: user }, salt);
            res.status(200)
                .json({ success: true, message: 'Login successful', data: token });
            // res.status(200).redirect('/personal-info');
        },
        (err) => {
            return res
                .status(400)
                .json({ success: false, message: err || 'Invalid username or password' });
        }
    );
};


module.exports = {
    userSignup,
    userLogin
};