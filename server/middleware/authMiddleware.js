const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    console.log("TOKEN FROM HEADER 👉", token);


    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 

    next();
  } catch (err) {
    console.log("JWT ERROR 👉", err.message);
    res.status(401).json({ message: "Invalid token" });
    

  }
};

module.exports = authMiddleware;
