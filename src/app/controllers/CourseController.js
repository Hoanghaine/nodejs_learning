const Course = require("../models/Course");
const { mongooseToObject } = require("../../utils/mongoose");

class CourseController {
  async show(req, res, next) {
    try {
      Course.findOne({ slug: req.params.slug }).then((Course) => {
        res.render("courses/show", { Course: mongooseToObject(Course) });
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  }
  search(req, res) {
    res.render("search");
  }
  create(req, res) {
    res.render("courses/create");
  }
  async edit(req, res) {
    try {
      const course = await Course.findById(req.params.id).then((course) => {
        res.render("courses/edit", { course: mongooseToObject(course) });
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  }
  async store(req, res) {
    console.log(req.body);
    const course = new Course(req.body);
    await course.save();
    res.redirect(`/`);
  }
  async update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  // [DELETE] /courses/:id
  async delete(req, res, next) {
    Course.deleteOne({_id: req.params.id})
    .then(()=>{
      res.redirect('back')
    })
    .catch(next)
  }
}
module.exports = new CourseController();
