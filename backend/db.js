const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://sgp_5thsem:jknv@cluster0.ftwjyia.mongodb.net/?retryWrites=true&w=majority";
//db connect

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
