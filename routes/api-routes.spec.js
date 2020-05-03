const request = require("supertest");
const { describe, it, beforeAll, expect } = require("@jest/globals");
const app = require("../server");
const db = require("../models");

const TEST_EMAIL = "test@test.com";
const TEST_PASSWORD = "badpassword";

describe("tests for api routes", function() {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true, logging: false });
    await db.User.create({
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });
  });

  it("GET /api/user_data returns a 200 with empty json if not logged in", function(done) {
    request(app)
      .get("/api/user_data")
      .expect(200, {}, done);
  });

  it("POST /api/signup failure", function(done) {
    request(app)
      .post("/api/signup")
      .send({ email: TEST_EMAIL, password: null })
      .expect(401, done);
  });

  it("POST /api/signup success", function(done) {
    request(app)
      .post("/api/signup")
      .send({ email: "test2@test.com", password: "badpassword" })
      .expect(307, done);
  });

  it("POST /api/login works for our test user", function(done) {
    request(app)
      .post("/api/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD })
      .expect(200)
      .expect(response => {
        expect(response.body.email).toBe(TEST_EMAIL);
      })
      .end(done);
  });

  it("GET /api/user_data works if logged in", function(done) {
    const server = request.agent(app);
    server
      .post("/api/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD })
      .expect(200)
      .then(() => {
        server
          .get("/api/user_data")
          .expect(200, { email: TEST_EMAIL, id: 1 }, done);
      });
  });

  it("GET /api/logout redirects to / and actually logs us out", function(done) {
    const server = request.agent(app);
    server
      .post("/api/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD })
      .expect(200)
      .then(() => {
        server
          .get("/logout")
          .expect(302)
          .expect("Location", "/")
          .then(() => {
            server.get("/api/user_data").expect(200, {}, done);
          });
      });
  });

  it("GET /api/all returns an empty list", done => {
    const server = request.agent(app);
    server.get("/api/all").expect(200, [], done);
  });

  it("GET /api/new creates a new post", done => {
    const server = request.agent(app);
    const EXAMPLE_TEXT = "test";
    server
      .post("/api/new")
      .send({ text: EXAMPLE_TEXT, user_id: 1 })
      .expect(200)
      .then(() => {
        server
          .get("/api/all")
          .expect(200)
          .then(response => {
            const { text, user_id: userId } = response.body[0];

            expect(text).toBe(EXAMPLE_TEXT);
            expect(userId).toBe("1");
            done();
          });
      });
  });
});
