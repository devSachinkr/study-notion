const mongoose = require("mongoose");
require("dotenv").config();
exports.dataBaseConnect = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Connection SuccessFull");
    })
    .catch((err) => {
      console.log("DataBase Failed To Connect", err);
      process.exit(1);
    });
};
