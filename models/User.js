const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  preferredName: { type: String, default: "" },
  currentAddress: {
    building: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  assignedHouse: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Housing' },  // Use 'Housing' not 'housings'
    houseNumber: { type: Number }, // other fields related to assignedHouse can be added here
  },
  cellPhoneNumber: { type: String },
  workPhoneNumber: { type: String, default: "" },
  carInfo: {
    make: { type: String, default: "" },
    model: { type: String, default: "" },
    color: { type: String, default: "" },
  },
  email: { type: String, unique: true },
  ssn: { type: String, default: "" },
  birthDate: { type: Date },
  gender: { type: String, enum: ["male", "female", "I do not wish to answer"] },
  applicationStatus: {
    type: String,
    enum: ["notStarted", "pending", "rejected", "approved"],
    default: "notStarted",
  },
  applicationRejectedFeedback: { type: String, default: "" },
  requireWorkAuthorization: { type: Boolean },
  citizenship: { type: String, enum: ['Green Card','Citzen', 'Other'], default: 'Other'},
  visa: {
    type: {
      type: String,
      enum: ["H1-B", "L2", "F1(CPT/OPT)", "H4", "Other", ""],
      default: "",
    },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
  },
  workAuthDoc: [
    {
      type: { type: String, default: "" },
      status: {
        type: String,
        enum: ["notSubmitted", "submitted", "rejected", "approved"],
        default: "notSubmitted",
      },
      file: { type: String, default: "" },
      feedback: { type: String, default: "" },
    },
  ],
  OPTCompleted: { type: Boolean, default: false },
  driverLicense: {
    licenseNumber: { type: String, default: "" },
    expirationDate: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  reference: {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    relationship: { type: String, default: "" },
  },
  emergencyContact: {
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String, default: "" },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String },
  },
  role: {
    type: String,
    enum: ["employee", "HR"],
    default: "employee",
    require,
  },
  profilePhoto: { type: String, default: "defaultImage" },
});

const userModel = mongoose.model("user", userSchema);

userModel.register = (newUser) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(4, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(newUser.password, salt, (err, hashString) => {
        if (err) reject(err);
        newUser.password = hashString;
        newUser.save().then(resolve);
      });
    });
  });
};

userModel.login = (password, user) => {
  return new Promise((resovle, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) reject(err);
      isMatch ? resovle() : reject("Invalid username or password");
    });
  });
};

module.exports = userModel;
