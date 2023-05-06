const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const connectMongoose = require("./utils/connectMongoose");
const UserModel = require("../models/User");

describe("HR Management", () => {
  after(async () => {
    await UserModel.deleteMany();
  });

  it("should connect to mongodb", connectMongoose);
  describe("", () => {
    let HRToken, EmployeeToken;
    before(async () => {
      await UserModel.deleteMany();
      const newHR = new UserModel({
        username: "HR4",
        email: "hr4@gmail.com",
        password: "HR4123",
        role: "HR",
      });
      await UserModel.register(newHR);
      const hr = await request(server).post("/api/auth/user/login").send({
        username: "HR4",
        password: "HR4123",
      });
      HRToken = hr.body.token;
      const newEmployee1 = new UserModel({
        username: "Employee1",
        email: "employee1@gmail.com",
        password: "E1123",
        role: "employee",
      });
      await UserModel.register(newEmployee1);
      const employee = await request(server).post("/api/auth/user/login").send({
        username: "Employee1",
        password: "E1123",
      });
      EmployeeToken = employee.body.token;
    });
    describe("get employees and get one employee", async () => {
      it("should get all employees", async () => {
        const res = await request(server)
          .get("/api/employees")
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(200);
        expect(res.body.length).to.equal(1);
      });
      it("should get one employees", async () => {
        const employees = await request(server)
          .get("/api/employees")
          .set({ Authorization: `Bearer ${HRToken}` });

        const employee = employees.body.employees[0];
        const res = await request(server)
          .get(`/api/employees/${employee._id}`)
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(200);
        expect(res.body.employee.email).to.equal(employee.email);
      });
    });
    describe("get application by status", async () => {
      it("should fail if status is not equal to pending, rejected, or approved", async () => {
        const res = await request(server)
          .get(`/api/employees/applications/otherstatus`)
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal(
          "Invaild status, only pending, rejected or approved."
        );
      });
      it("should success if status is pending", async () => {
        const res = await request(server)
          .get(`/api/employees/applications/pending`)
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(200);
        expect(res.body.applications.length).to.equal(0);
      });
      it("should success if status is rejected", async () => {
        const res = await request(server)
          .get(`/api/employees/applications/rejected`)
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(200);
        expect(res.body.applications.length).to.equal(0);
      });
      it("should success if status is approved", async () => {
        const res = await request(server)
          .get(`/api/employees/applications/approved`)
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(200);
        expect(res.body.applications.length).to.equal(0);
      });
    });
    describe("get visa employees", async () => {
      it("should fail if status is not equal to all or inprogress", async () => {
        const res = await request(server)
          .get("/api/employees/visaEmployees/otherstatus")
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal(
          "Invaild status, only all or inprogress."
        );
      });
      it("should success if status is all ", async () => {
        const res = await request(server)
          .get("/api/employees/visaEmployees/all")
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(200);
        expect(res.body.visaEmployees.length).to.equal(0);
      });
      it("should success if status is inprogress", async () => {
        const res = await request(server)
          .get("/api/employees/visaEmployees/inprogress")
          .set({ Authorization: `Bearer ${HRToken}` });
        expect(res.statusCode).to.equal(200);
        expect(res.body.visaEmployees.length).to.equal(0);
      });
    });
  });
});
