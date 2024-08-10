const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../utils/mongoose");

class SiteController {
  async index(req, res, next) {
    try {
      Course.find({})
        .then((courses) => {
          res.render("home", { courses: mutipleMongooseToObject(courses) });
        })
        .catch(next);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  }
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
