const express = require("express");
const router = express.Router();
const courseController = require("./controllers/courseController");

router.get("/courses", courseController.getAllCourses);
router.post("/course", courseController.createCourse);
router.delete("/course/:id", courseController.deleteCourse);
router.get("/courses/search", courseController.searchCourses);

module.exports = router;