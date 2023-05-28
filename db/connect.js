const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(`Connected to DB succesfully`)
    .catch((err) => console.log(err));
};

module.exports = connectDB;
