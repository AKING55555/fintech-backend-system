const mongoose = require("mongoose");

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("CONNECTED SUCCESSFULLY");
    process.exit();
  })
  .catch(err => {
    console.error("ERROR:", err.message);
    process.exit();
  });