const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  roommates: [
    {
      preferredName: String,
      legalFullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
  ],
  reports: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["Open", "In Progress", "Closed"],
        default: "Open",
      },
      comments: [
        {
          description: {
            type: String,
            required: true,
          },
          createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
});

const Housing = mongoose.model("Housing", housingSchema);

module.exports = Housing;
