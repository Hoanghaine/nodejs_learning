const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../utils/mongoose");

class MeController {
  // [GET] /me/stored/courses
  async storedCourses(req, res, next) {
    try {
      Course.find({}).then((courses) => {
        res.render("me/stored-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  }
}
module.exports = new MeController();
