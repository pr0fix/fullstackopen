const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const api = supertest(app);
describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "testUser",
      password: "secretTest",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

describe("creating a new user is declined", () => {

  test("when username is taken", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "root",
      password: "secret",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB();
    
    assert(result.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("when username is under 3 characters long", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "Te",
      password: "testPassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("when username is missing", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      password: "testPassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("when password is under 3 characters long", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "testUser",
      password: "te",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("when password is missing", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "testUser",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
