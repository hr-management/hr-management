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
    _id: uuid.v4(),
    username: 'HR1',
    email: 'hr1@gmail.com',
    password: 'HR1123',
    role: 'HR'
});
const newUser2 = new userModel({
    _id: uuid.v4(),
    username: 'HR2',
    email: 'hr2@gmail.com',
    password: 'HR2123',
    role: 'HR'
});
const newUser3 = new userModel({
    _id: uuid.v4(),
    username: 'HR3',
    email: 'hr3@gmail.com',
    password: 'HR3123',
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
