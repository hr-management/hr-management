const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const UserModel = require("../models/User");

describe("validator middleware ", () => {
  it("should fail without email to make invitation", async () => {
    const res = await request(server).post("/api/employees/invitation").send({
      name: "user2",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal("Please provide email.");
  });

  it("should fail without valid email to make invitation", async () => {
    const res = await request(server).post("/api/employees/invitation").send({
      email: "user2",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal("Please provide valid email.");
  });

  it("should fail without username when signup", async () => {
    const res = await request(server).post("/api/auth/user/signup").send({
      email: "user2@gmail.com",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal("Please provide username.");
  });
  it("should fail without valid username when signup", async () => {
    const res = await request(server).post("/api/auth/user/signup").send({
      username: "user!@<>",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal(
      "Please provide valid username, username only contains letters and numbers and less than 50 characters"
    );
  });
  it("should fail without password when login", async () => {
    const res = await request(server).post("/api/auth/user/login").send({
      username: "user2",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal("Please provide password.");
  });
  it("should fail without valid password when login", async () => {
    const res = await request(server).post("/api/auth/user/login").send({
      username: "user2",
      password: "pa",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal(
      "The length of the password is between 3-30 characters"
    );
  });
  it("should fail if not a HR to make invitation", async () => {
    await UserModel.deleteMany();
    const newEmployee1 = new UserModel({
      username: "Employee1",
      email: "employee1@gmail.com",
      password: "E1123",
      role: "employee",
    });
    await UserModel.register(newEmployee1);
    const user = await request(server).post("/api/auth/user/login").send({
      username: "Employee1",
      password: "E1123",
    });
    const EmployeeToken = user.body.token;
    const res = await request(server)
      .post("/api/employees/invitation")
      .send({
        name: "user2",
        email: "user2@gmail.com",
      })
      .set({ Authorization: `Bearer ${EmployeeToken}` });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal(
      "You don't have permission to access this information."
    );
    await UserModel.deleteMany();
  });
});
