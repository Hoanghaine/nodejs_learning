const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

router.get("/create", courseController.create);
router.post("/handle-form-actions", courseController.handleFormActions);
router.post("/trash/handle-form-actions", courseController.handleTrashFormActions);

router.get("/:id/edit", courseController.edit);
router.put("/:id", courseController.update);
router.patch("/:id/restore", courseController.restore);
router.delete("/:id", courseController.delete);
router.delete("/:id/force", courseController.forceDelete);
router.post("/store", courseController.store);
router.get("/:slug", courseController.show);


module.exports = router;
