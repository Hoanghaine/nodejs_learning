const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });

    console.log("connect successfully");
  } catch (e) {
    console.log("connect fail");

    console.log(e);
  }
};
module.exports = { connect };
