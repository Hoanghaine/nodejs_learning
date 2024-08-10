const mongoose = require("mongoose");
let slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = new Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true }, // Add unique property
    level: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", Course);
