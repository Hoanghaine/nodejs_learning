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
  async store(req, res, next) {
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect(`/me/stored/courses`))
      .catch(next);
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
    Course.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  async forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  async restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseId } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action invalid" });
    }
  }
  handleTrashFormActions(req, res, next) {
    switch (req.body.action) {
      case "forceDelete":
        Course.deleteMany({ _id: { $in: req.body.courseId } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "restore":
        Course.restore({ _id: { $in: req.body.courseId } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action invalid" });
    }
  }
}
module.exports = new CourseController();
