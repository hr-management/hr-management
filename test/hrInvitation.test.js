const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const connectMongoose = require("./utils/connectMongoose");
const RegistrationHistoryModel = require("../models/registrationHistory");

describe("HR Invitation", () => {
  after(async () => {
    
  });

  it("should connect to mongodb", connectMongoose);
  
  it("should fail to use exist email to make invitation", () => {
    
  })
  
});
