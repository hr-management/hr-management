const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require("dotenv").config();

const salt = process.env.JWT_SALT;

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
            const token = jwt.sign({ userId: user._id }, salt);
            res.cookie('token', token);
            res
                .status(200)
                .json({ success: true, message: 'Login successful', data: user });
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
    userLogin
};