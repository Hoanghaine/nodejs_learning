const path = require("path");
const express = require("express");
const morgan = require("morgan");
let methodOverride = require("method-override");

const SortMiddleware = require("./app/middlewares/sortMiddleware");

const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db/index");
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(SortMiddleware);

// Template engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
