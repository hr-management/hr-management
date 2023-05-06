const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const UserModel = require("../models/User");
const connectMongoose = require("./utils/connectMongoose");

const mockUser = {
  username: "mockUserTest",
  password: "mock123",
  email: "mockUserTest@gmail.com",
  role: "employee",
};

const updates = {
  firstName: "firstName",
  lastName: "lastName",
  currentAddress: {
    building: "building",
    street: "street",
    city: "city",
    state: "state",
    zip: "zip",
  },
  cellPhoneNumber: "cellPhoneNumber",
  ssn: "ssn",
  birthDate: "birthDate",
  driverLicense: {
    licenseNumber: "licenseNumber",
    expirationDate: "expirationDate",
    photo: "photo",
  },
  emergencyContact: {
    firstName: "firstName",
    lastName: "lastName",
    middleName: "middleName",
    phone: "phone",
    email: "email",
    relationship: "relationship",
  },
};

describe("User Routes", () => {
  after(async () => {
    // Delete test data
    await UserModel.deleteOne({ email: mockUser.email });
  });

  it("should connect to mongodb", connectMongoose);

  let jwtToken = "";
  describe("User On Boarding", async () => {
    it("should be registered successfull", async () => {
      const res = await request(server)
        .post("/api/auth/user/signup")
        .send(mockUser);
      expect(res.status).to.equal(200);

      jwtToken = res.body.token;
    });

    it("should update status successfully", async () => {
      const res = await request(server)
        .put("/api/user/onboarding/status")
        .send(updates)
        .set({ Authorization: `Bearer ${jwtToken}` });
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      const updateduser = res.body.user;

      expect(updateduser.firstName).to.equal(updates.firstName);
      expect(updateduser.lastName).to.equal(updates.lastName);
      expect(updateduser.currentAddress).to.be.an("Object");
      expect(updateduser.cellPhoneNumber).to.equal(updates.cellPhoneNumber);
      expect(updateduser.ssn).to.equal(updates.ssn);
      expect(updateduser.birthDate).to.equal(updates.birthDate);
      expect(updateduser.driverLicense).to.be.an("Object");
      expect(updateduser.emergencyContact).to.be.an("Object");
    });

    it("should update status to pending successfully", async () => {
      const res = await request(server)
        .get("/api/auth/user/info")
        .set({ Authorization: `Bearer ${jwtToken}` });

      expect(res.status).to.equal(200);
      expect(res.body.user.applicationStatus).to.equal("pending");
    });

    it("should update status failed", async () => {
      const res = await request(server)
        .put("/api/user/onboarding/status")
        .send(updates)
        .set({ Authorization: `Bearer ${jwtToken}` });

      console.log(res.status);

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal(
        "Please wait for HR to review your application"
      );
    });
  });
});
