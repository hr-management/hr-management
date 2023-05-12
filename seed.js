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
  try {
    const newHousings = [
      {
        address: '123 Main St',
        landlord: {
          legalFullName: 'John Landlord',
          phoneNumber: '1234567890',
          email: 'john@example.com',
        },
        roommates: [
          {
            preferredName: 'John',
            legalFullName: 'John Doe',
            phoneNumber: '1234567890',
            email: 'john@example.com',
            carInformation: 'Toyota Camry',
          },
          {
            preferredName: 'Alice',
            legalFullName: 'Alice Smith',
            phoneNumber: '9876543210',
            email: 'alice@example.com',
            carInformation: 'Honda Civic',
          },
        ],
        facility: {
          beds: 3,
          mattresses: 3,
          tables: 1,
          chairs: 4,
        },
        reports: [
          {
            title: 'Leaky Faucet',
            description: 'The faucet in the kitchen is leaking.',
            createdBy: new mongoose.Types.ObjectId(),
            timestamp: '2022-10-05T09:30:00.000Z',
            status: 'Open',
            comments: [],
          },
        ],
      },
      {
        address: '456 Elm St',
        landlord: {
          legalFullName: 'Sarah Landlord',
          phoneNumber: '1112223333',
          email: 'sarah@example.com',
        },
        roommates: [
          {
            preferredName: 'Mike',
            legalFullName: 'Michael Johnson',
            phoneNumber: '1112223333',
            email: 'mike@example.com',
            carInformation: 'Ford Mustang',
          },
          {
            preferredName: 'Sarah',
            legalFullName: 'Sarah Davis',
            phoneNumber: '4445556666',
            email: 'sarah@example.com',
            carInformation: 'Chevrolet Malibu',
          },
          {
            preferredName: 'Emily',
            legalFullName: 'Emily Thompson',
            phoneNumber: '7778889999',
            email: 'emily@example.com',
            carInformation: 'N/A',
          },
        ],
        facility: {
          beds: 4,
          mattresses: 4,
          tables: 2,
          chairs: 6,
        },
        reports: [
          {
            title: 'Broken Window',
            description: 'There is a broken window in the living room.',
            createdBy: new mongoose.Types.ObjectId(),
            timestamp: '2022-11-15T14:45:00.000Z',
            status: 'Closed',
            comments: [
              {
                description: 'Window has been fixed.',
                createdBy: new mongoose.Types.ObjectId(),
                timestamp: '2022-11-15T15:00:00.000Z',
              },
            ],
          },
          {
            title: 'Clogged Sink',
            description: 'The sink in the bathroom is clogged.',
            createdBy: new mongoose.Types.ObjectId(),
            timestamp: '2022-12-01T11:20:00.000Z',
            status: 'In Progress',
            comments: [],
          },
        ],
      },
    ];

    for (const housingData of newHousings) {
      const newHousing = new housingModel(housingData);
      await newHousing.save();
      console.log('New housing created:', newHousing);
    }

    console.log('Data import completed successfully.');
    db.close();
  } catch (error) {
    console.error('Error importing data:', error);
  }
})();


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
