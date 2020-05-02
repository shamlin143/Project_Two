const request = require("supertest");
const { describe, it } = require("@jest/globals");
const app = require("../server");

describe("tests for html routes", function() {
  it("GET / (the main page) renders the signup page if you are not logged in", done => {
    request(app)
      .get("/")
      .expect(200, done);
  });

  it("GET /login renders the login if you are not logged in", done => {
    request(app)
      .get("/login")
      .expect(200, done);
  });

  it("GET /members redirects to login if you are not logged in", done => {
    request(app)
      .get("/members")
      .expect(302)
      .expect("Location", "/", done);
  });
});
