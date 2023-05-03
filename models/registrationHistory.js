const mongoose = require("mongoose");

const RegistrationHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: [true, "This email is used. Please enter another one."],
  },
  name: {
    type: String,
    required: [true, "please provide a name."],
  },
  registrationLink: {
    type: String,
    required: [true, "please provide the registration link."],
  },
});
const RegistrationHistoryModel = mongoose.model(
  "registrationHistory",
  RegistrationHistorySchema
);

module.exports = RegistrationHistoryModel;
