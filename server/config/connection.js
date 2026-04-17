const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)  
  .then(() => console.log("✅ CONNECTED TO DATABASE"))
  .catch((err) => console.error("ERROR CONNECTING TO DATABASE:", err));