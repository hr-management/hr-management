//hardcoded info for HR 
const userModel = require('./models/User');
const mongoose = require('mongoose');
const uuid = require('uuid');
require('dotenv').config();

mongoose.connect(`mongodb+srv://hrmanagement:hr123@cluster0.bdlgbaa.mongodb.net/hr_management?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('MongoDB connection successful');
});

const newUser1 = new userModel({
    username: 'HR4',
    email: 'hr4@gmail.com',
    password: 'HR4123',
    role: 'HR'
});
const newUser2 = new userModel({
    username: 'HR5',
    email: 'hr5@gmail.com',
    password: 'HR5123',
    role: 'HR'
});
const newUser3 = new userModel({
    username: 'HR6',
    email: 'hr6@gmail.com',
    password: 'HR6123',
    role: 'HR'
});

userModel.register(newUser1)
    .then(() => {
        console.log('User1 registered successfully');
    })
    .catch((err) => {
        console.error('Error registering user:', err);
    });
userModel.register(newUser2)
    .then(() => {
        console.log('User2 registered successfully');
    })
    .catch((err) => {
        console.error('Error registering user:', err);
    });
userModel.register(newUser3)
    .then(() => {
        console.log('User3 registered successfully');
    })
    .catch((err) => {
        console.error('Error registering user:', err);
    });
