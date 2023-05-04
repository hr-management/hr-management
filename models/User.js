const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, default: '' },
    preferredName: { type: String, default: '' },
    currentAddress: {
        building: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    },
    cellPhoneNumber: { type: String, required: true },
    workPhoneNumber: { type: String, default: '' },
    carInfo: {
        make: { type: String, default: '' },
        model: { type: String, default: '' },
        color: { type: String, default: '' }
    },
    email: { type: String, required: true, unique: true },
    ssn: { type: String, required: true },
    birthDate: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'I do not wish to answer'], required: true },
    applicationStatus: { type: String, enum: ['notStarted', 'pending', 'rejected', 'approved'], default: 'notStarted' },
    applicationRejectedFeedback: { type: String, default: '' },
    requireWorkAuthorization: { type: Boolean, required: true },
    visa: {
        type: { type: String, enum: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'], default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' }
    },
    workAuthDoc: [
        {
            type: { type: String, required: true },
            status: { type: String, enum: ['notSubmitted', 'submitted', 'rejected', 'approved'], default: 'notSubmitted' },
            file: { type: String, default: '' },
            feedback: { type: String, default: '' }
        }
    ],
    driverLicense: {
        licenseNumber: { type: String, default: '' },
        expirationDate: { type: String, default: '' },
        photo: { type: String, default: '' }
    },
    reference: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        middleName: { type: String, default: '' },
        phone: { type: String, default: '' },
        email: { type: String, default: '' },
        relationship: { type: String, default: '' }
    },
    emergencyContact: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String, default: '' },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        relationship: { type: String, required: true }
    },
    role: { type: String, enum: ['employee', 'HR'], required: true },
    profilePhoto: { type: String, default: 'defaultImage' }
});

module.exports = mongoose.model('user', userSchema);