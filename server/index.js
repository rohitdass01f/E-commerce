if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const app = express();

require("./config/connection");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use(cors());
app.use(express.json());

app.use("/admin", require("./routes/adminRoutes"));
app.use("/order", require("./routes/orderRoutes"));
app.use("/category", require("./routes/categoryRoutes"));
app.use("/payment", require("./routes/paymentRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/product", require("./routes/productRoutes"));

app.get("/", (req, res) => {
  res.send("server running successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});