//hardcoded info for HR
const userModel = require("./models/User");
const housingModel = require('./models/housing');

const mongoose = require("mongoose");
const uuid = require("uuid");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://hrmanagement:hr123@cluster0.bdlgbaa.mongodb.net/hr_management?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async function () {
  console.log("MongoDB connection successful");
});

(async function () {
  await userModel.deleteMany();

  const newUser1 = new userModel({
    username: "HR4",
    email: "hr4@gmail.com",
    password: "HR4123",
    role: "HR",
  });
  const newUser2 = new userModel({
    username: "HR5",
    email: "hr5@gmail.com",
    password: "HR5123",
    role: "HR",
  });
  const newUser3 = new userModel({
    username: "HR6",
    email: "hr6@gmail.com",
    password: "HR6123",
    role: "HR",
  });
  const newEmployee1 = new userModel({
    username: "Employee1",
    email: "employee1@gmail.com",
    password: "E1123",
    role: "employee",
  });
  userModel
    .register(newUser1)
    .then(() => {
      console.log("User1 registered successfully");
    })
    .catch((err) => {
      console.error("Error registering user:", err);
    });
  userModel
    .register(newUser2)
    .then(() => {
      console.log("User2 registered successfully");
    })
    .catch((err) => {
      console.error("Error registering user:", err);
    });
  userModel
    .register(newUser3)
    .then(() => {
      console.log("User3 registered successfully");
    })
    .catch((err) => {
      console.error("Error registering user:", err);
    });
  userModel
    .register(newEmployee1)
    .then(() => {
      console.log("newEmployee1 registered successfully");
    })
    .catch((err) => {
      console.error("Error registering user:", err);
    });
})();

// 
// (async function () {
//   await housingModel.deleteMany();

//   const newHousing = new housingModel({
//     address: '123 Elm St',
//     roommates: [
//       {
//         preferredName: 'Jane',
//         legalFullName: 'Jane Smith',
//         phoneNumber: '555-555-5555'
//       },
//       {
//         preferredName: 'Bob',
//         legalFullName: 'Bob Johnson',
//         phoneNumber: '444-444-4444'
//       }
//     ],
//     reports: [
//       {
//         title: 'Leaky roof',
//         description: 'The roof is leaking in the living room.',
//         createdBy: new mongoose.Types.ObjectId(),
//         timestamp: new Date(),
//         status: 'Open',
//         comments: [
//           {
//             description: 'I will have a contractor look at it.',
//             createdBy: new mongoose.Types.ObjectId(),
//             timestamp: new Date()
//           }
//         ]
//       }
//     ]
//   });

//   await newHousing.save();
// })();
