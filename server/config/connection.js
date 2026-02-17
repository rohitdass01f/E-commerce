const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rohit12150:rohit121@full-ecommerce.gu82k0i.mongodb.net/userrohit?retryWrites=true&w=majority&appName=full-ecommerce"
  )
  .then(() => {
    console.log("✅ CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.error(" ERROR CONNECTING TO DATABASE:", err);
  });
