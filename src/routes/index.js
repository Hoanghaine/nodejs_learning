const newsRouter = require("./news.route");
const siteRouter = require("./site.route");
const courseRouter = require("./course.route")
const meRouter = require("./me.route");
const route = (app) => {
  app.use("/news", newsRouter);
  app.use("/courses",courseRouter)
  app.use("/me", meRouter);
  app.use("/", siteRouter);
};
module.exports = route;
