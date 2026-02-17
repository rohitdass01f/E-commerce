const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connection = require("./config/connection");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes");


app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());


app.use("/admin", adminRoutes);
app.use("/order", require("./routes/orderRoutes"));
app.use("/category", categoryRoutes);
app.get("/", (req, res) => {
  res.send("this is frontend server");
});
app.use("/payment", require("./routes/paymentRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/product",productRoutes);

app.listen(3000, () => {
  console.log("server running at port 3000");
});
