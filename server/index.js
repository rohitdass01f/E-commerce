const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connection = require("./config/connection");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

// routes
app.use("/admin", require("./routes/adminRoutes"));
app.use("/order", require("./routes/orderRoutes"));
app.use("/category", require("./routes/categoryRoutes"));
app.use("/payment", require("./routes/paymentRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/product", require("./routes/productRoutes"));

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
