const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/course");
const Routes = require('../routes');

const app = express();
app.use(express.json());
app.use('/api', Routes);

jest.mock("../models/course");

describe("Course API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /api/courses", () => {
    it("should return all courses", async () => {
      Course.find.mockResolvedValue([{ subject: "Test", courseNumber: "101", description: "Test" }]);
      const res = await request(app).get("/api/courses");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ subject: "Test", courseNumber: "101", description: "Test" }]);
    });

    it("should return 500 if there is an error", async () => {
      Course.find.mockRejectedValue(new Error("Database error"));
      const res = await request(app).get("/api/courses");
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "An error occurred while fetching courses." });
    });
  });

  describe("POST /course", () => {
    it("should save a new course", async () => {
      Course.findOne.mockResolvedValue(null);
      Course.prototype.save.mockResolvedValue({ subject: "Test", courseNumber: "101", description: "Test" });

      const res = await request(app)
        .post("/api/course")
        .send({ subject: "Test", courseNumber: "101", description: "Test" });

      expect(res.statusCode).toBe(201);

    });

    it("should return 400 if course number is invalid", async () => {
      const res = await request(app)
        .post("/api/course")
        .send({ subject: "Test", courseNumber: "10", description: "Test" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Course number must be a three-digit, zero-padded integer like "033".' });
    });

    it("should return 400 if course already exists", async () => {
      Course.findOne.mockResolvedValue({ subject: "Test", courseNumber: "101" });

      const res = await request(app)
        .post("/api/course")
        .send({ subject: "Test", courseNumber: "101", description: "Test" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: "A course with this subject and number already exists." });
    });
  });

  describe("DELETE /api/course/:id", () => {
    it("should delete a course", async () => {
      Course.findByIdAndDelete.mockResolvedValue(true);

      const res = await request(app).delete("/api/course/123");

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 if course not found", async () => {
      Course.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete("/api/course/123");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: "Course not found" });
    });

    it("should return 400 if invalid course ID", async () => {
      Course.findByIdAndDelete.mockRejectedValue(new Error("Invalid course ID"));

      const res = await request(app).delete("/api/course/123998");

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: "Invalid course ID" });
    });
  });

  describe("GET /api/courses/search", () => {
    it("should return courses matching the search query", async () => {
      Course.find.mockResolvedValue([{ subject: "Test", courseNumber: "101", description: "Test" }]);

      const res = await request(app).get("/api/courses/search").query({ query: "Test" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ subject: "Test", courseNumber: "101", description: "Test" }]);
    });

    it("should return 500 if there is an error", async () => {
      Course.find.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/api/courses/search").query({ query: "Test" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "An error occurred while searching for courses." });
    });
  });
});
